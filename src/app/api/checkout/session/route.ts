import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  slug?: string;
}

export async function POST(req: Request) {
  try {
    const { items, shippingAddress, userId } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart items cannot be empty.' }, { status: 400 });
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const lineItems = items.map((item: CheckoutItem) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image && item.image.startsWith('http') ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Construct session with metadata for webhook fulfillment
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: {
        userId: userId || '',
        items: JSON.stringify(
          items.map((i: CheckoutItem) => ({
            id: i.id,
            quantity: i.quantity,
            price: i.price,
          }))
        ),
        shipping: JSON.stringify(shippingAddress || {}),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to initialize checkout session';
    console.error('Error creating Stripe checkout session:', error);
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}
