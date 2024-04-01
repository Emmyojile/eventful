"use client";

import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import { Button } from "../ui/button";
import { usePaystackPayment } from "react-paystack";

const config = {
  reference: new Date().getTime().toString(),
  email: "emmy@example.com",
  publicKey: "pk_test_6eed9e8bff39506d1bd2a648268573e89cf00ec6",
  title: "", // Initialize as undefined
  currency: "NGN",
  amount: 0, // Initialize as undefined,
  // metadata: {
  //   custom_fields: [
  //     {
  //       display_name: "Event Title", // Descriptive display name
  //       variable_name: "event_title",
  //       value: event.title, // Access event title
  //     },
  //   ],
  // },
};

const onSuccess = (reference: string) => {
  // Implement for success handling (e.g., update event status, display confirmation)
  console.log("Payment successful!", reference);
};

const onClose = () => {
  // Implement for payment closure handling (e.g., display cancellation message)
  console.log("Payment closed");
};

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  const initializePayment = usePaystackPayment(config);

  const onCheckout = async () => {
    console.log("Event data:", event); // Log entire event object
    console.log("Logged in User:", userId); // Log entire event object

    config.title = event.title; // Access event title correctly

    // Ensure event.price exists and is a number
    const price = parseFloat(event.price); // Parse the string to a number
    if (isNaN(price)) {
      throw new Error("Event price is invalid. Please check event data.");
    }

    const priceInKobo = price * 100; // Now use the converted number
    config.amount = priceInKobo;

    try {
      await initializePayment({
        onSuccess, // Assign onSuccess function directly
        onClose, // Assign onClose function directly
      });
    } catch (error) {
      console.error("Payment failed:", error);
      // Handle payment errors
    } finally {
      onClose(); // Call onClose here for closure handling
    }
  };

  return (
    <>
      {event.isFree ? (
        <Button type="submit" role="link" size="lg" className="button sm:w-fit">
          Get Ticket
        </Button>
      ) : (
        <Button
          className="bg-blue-700 text-white p-4 rounded-xl"
          onClick={onCheckout}
        >
          Pay with Paystack
        </Button>
      )}
    </>
  );
};

export default Checkout;

// "use client";
// import { IEvent } from "@/lib/database/models/event.model";
// import React from "react";
// import { Button } from "../ui/button";
// import { usePaystackPayment } from "react-paystack";

// const config = {
//   reference: new Date().getTime().toString(),
//   email: "emmy@example.com",
//   amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
//   publicKey: "pk_test_6eed9e8bff39506d1bd2a648268573e89cf00ec6",
// };

// // you can call this function anything
// const onSuccess = (reference) => {
//   // Implementation for whatever you want to do with reference and after success call.
//   console.log(reference);
// };

// // you can call this function anything
// const onClose = () => {
//   // implementation for  whatever you want to do when the Paystack dialog closed.
//   console.log("closed");
// };

// const PaystackHookExample = () => {
//   const initializePayment = usePaystackPayment(config);
//   return (
//     <div>
//       <button
//         className="bg-blue-700  text-white p-4 rounded-xl"
//         onClick={() => {
//           initializePayment(onSuccess, onClose);
//         }}
//       >
//        Pay with Paystack
//       </button>
//     </div>
//   );
// };

// const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
//   const onCheckout = async () => {
//     console.log("CHECKOUT");
//   };
//   return (
//     <>
//       {event.isFree ? (
//         <Button type="submit" role="link" size="lg" className="button sm:w-fit">
//           'Get Ticket'
//         </Button>
//       ) : (
//         <PaystackHookExample />
//       )}
//       {/* // <form method="post"> */}
//       {/* <Button type="submit" role="link" size="lg" className="button sm:w-fit">
//         {event.isFree ? "Get Ticket" : "Buy Ticket"}
//       </Button> */}
//       {/* // </form> */}
//     </>
//   );
// };

// export default Checkout;
