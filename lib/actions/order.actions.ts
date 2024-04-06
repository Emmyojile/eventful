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