// import { NextApiRequest, NextApiResponse } from 'next';
// import crypto from 'crypto';
// import { createOrder } from '@/lib/actions/order.actions';

// // Replace with your Paystack secret key from the dashboard
// const secret = process.env.PAYSTACK_TEST_SECRET_KEY;

// export default async function handler(req: Request, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).send('Method Not Allowed');
//   }

//   const body = await req.text();
//   const sig = req.headers['x-paystack-signature'] as string;

//   try {
//     // Verify signature to ensure request originated from Paystack
//     const hash = crypto.createHmac('sha512', secret).update(body).digest('hex');
//     if (hash !== sig) {
//       throw new Error('Invalid signature');
//     }

//     const event = JSON.parse(body); // Parse the JSON event data

//     // Extract relevant information from the event
//     const { reference, amount, customer } = event.data.object;

//     // Call your function (createOrder) to save the transaction in the database
//     const newOrder = await createOrder({
//       reference,
//       amount,
//       customerId: customer.id, // Assuming customer has an ID property
//     });

//     res.status(200).json({ message: 'OK', order: newOrder });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Webhook Error' });
//   }
// }




// const crypto = require('crypto');
// const secret = process.env.SECRET_KEY;
// // Using Express
// app.post("/my/webhook/url", function(req, res) {
//     //validate event
//     const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
//     if (hash == req.headers['x-paystack-signature']) {
//     // Retrieve the request's body
//     const event = req.body;
//     // Do something with event  
//     }
//     res.send(200);
// });