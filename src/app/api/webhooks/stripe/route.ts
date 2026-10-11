import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET environment variable.');
    return NextResponse.json(
      { error: 'Webhook secret is not configured' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${errorMessage}` },
      { status: 400 }
    );
  }

  // Handle specific Stripe event types
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Payment succeeded for session:', session.id);

      const metadata = session.metadata || {};
      const userId = metadata.userId || null;
      let items: { id: string; quantity: number; price: number }[] = [];
      let shipping: Record<string, unknown> = {};

      try {
        if (metadata.items) items = JSON.parse(metadata.items);
        if (metadata.shipping) shipping = JSON.parse(metadata.shipping);
      } catch (parseErr) {
        console.error('Error parsing session metadata:', parseErr);
      }

      const totalAmount = (session.amount_total ?? 0) / 100;
      const currency = session.currency || 'usd';
      const paymentIntentId =
        typeof session.payment_intent === 'string' ? session.payment_intent : null;

      try {
        const supabase = createAdminClient();

        // 1. Insert Order Record
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: userId || null,
            status: 'processing',
            total_amount: totalAmount,
            currency: currency,
            stripe_payment_intent_id: paymentIntentId,
            stripe_session_id: session.id,
            shipping_details: shipping,
          })
          .select('id')
          .single();

        if (orderError) {
          console.error('Failed to insert order into Supabase:', orderError);
        } else if (orderData && items.length > 0) {
          // 2. Insert Order Items
          const orderItems = items.map((item) => ({
            order_id: orderData.id,
            product_id: item.id,
            quantity: item.quantity,
            unit_price: item.price,
          }));

          const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

          if (itemsError) {
            console.error('Failed to insert order items:', itemsError);
          }

          // 3. Decrement Inventory for Purchased Units
          for (const item of items) {
            const { data: inv } = await supabase
              .from('inventory')
              .select('stock_quantity')
              .eq('product_id', item.id)
              .single();

            if (inv) {
              const newStock = Math.max(0, inv.stock_quantity - item.quantity);
              await supabase
                .from('inventory')
                .update({ stock_quantity: newStock, updated_at: new Date().toISOString() })
                .eq('product_id', item.id);
            }
          }
        }
      } catch (dbErr) {
        console.error('Database fulfillment error during webhook handling:', dbErr);
      }

      break;
    }
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent succeeded:', paymentIntent.id);
      break;
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.warn('PaymentIntent failed:', paymentIntent.id, paymentIntent.last_payment_error?.message);
      break;
    }
    default:
      console.log(`Unhandled Stripe event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
