"use server"
interface PaystackParams {
  amount: number;
  email: string;
  currency: string;
  channels?: string[];
  callback_url?: string;
  metadata?:object
}

interface VerifyParams {
  reference: string;
}


const secretKey: string = process.env.PAYSTACK_TEST_SECRET_KEY as string;
const url: string = process.env.PAYSTACK_PAYMENT_URL as string;

const getCommonHeaders = () => ({
  Authorization: `Bearer ${secretKey}`,
  'Content-Type': 'application/json',
});

//paystack function for initiating payment and generating redirection url

export const paystackPay = async (
  {
  amount,
  email,
  currency,
  channels,
  callback_url,
  metadata
}: PaystackParams) => {
  const options = {
    method: 'POST',
    headers: getCommonHeaders(),
    body: JSON.stringify({
      email: `${email}`,
      amount: `${amount * 100}`,
      currency: currency,
      channels: channels,
      callback_url: callback_url,
      metadata:metadata
    }),
  };

  try {
    const response = await fetch(`${url}/transaction/initialize`, options);
    const data = await response.json();
    console.log("Payment details sent to Paystack:", paymentDetails);
    return data;
  } catch (error) {
    return error;
  }
};


//paystack function for confirming payment

export const verifyPaystackTransaction = async ({ reference }: VerifyParams) => {
  const options = {
    method: 'GET',
    headers: getCommonHeaders(),
  };

  try {
    const response = await fetch(`${url}/transaction/verify/${reference}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};









import { CreateOrderParams } from "@/types";
import { connectToDatabase } from "../database";
import Order from "../database/models/order.model";
import { handleError } from "../utils";


export const createOrder = async (orderData: CreateOrderParams) => {
    try {
      await connectToDatabase(); // Assuming a connection function
  
      const newOrder = await Order.create(orderData);
      return newOrder;
    } catch (error) {
      handleError(error); // Assuming an error handling function
    }
  };

  
// export const createOrder = async (order: CreateOrderParams) => {
//     try {
//       await connectToDatabase();
      
//       const newOrder = await Order.create({
//         ...order,
//         event: order.eventId,
//         buyer: order.buyerId,
//       });
  
//       return JSON.parse(JSON.stringify(newOrder));
//     } catch (error) {
//       handleError(error);
//     }
//   }