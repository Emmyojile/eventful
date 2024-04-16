import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createOrder } from '@/lib/actions/order.actions'; // Assuming this is your order creation function

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('x-paystack-signature') as string;
  const endpointSecret = process.env.PAYSTACK_TEST_SECRET_KEY! // Replace with your environment variable name

  const hash = crypto.createHmac('sha512', endpointSecret).update(body).digest('hex');

  if (hash !== sig) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 403 });
  }

  // Process the Paystack event data
  try {
    const event = JSON.parse(body); // Parse the request body as JSON

    const eventType = event.type; // Update with Paystack event type

    // CREATE
    if (eventType === 'payment.successful') {
      const { reference, amount, metadata } = event.data; // Update with Paystack data names

      const order = {
        reference,
        paystackId: reference,
        eventId: metadata?.eventId || '',
        buyerId: metadata?.buyerId || '',
        totalAmount: amount ? (amount / 100).toString() : '0', // Adjust if Paystack uses a different unit
        createdAt: new Date(),
      }

      const newOrder = await createOrder(order);
      console.log("New order created:", newOrder);
      return NextResponse.json({ message: 'OK', order: newOrder });
    }

    return NextResponse.json({ message: 'Unsupported event type' });
  } catch (error) {
    console.error("Error processing Paystack event:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}



