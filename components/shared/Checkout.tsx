// "use client";
// import { IEvent } from "@/lib/database/models/event.model";
// import React, { useState } from "react";
// import { Button } from "../ui/button";
// import { paystackPay } from "@/lib/actions/order.actions";

// const Checkout = ({ event, userId, userEmail }: { event: IEvent; userId: string; userEmail: string }) => {
//   const [paymentProcessing, setPaymentProcessing] = useState(false);

//   const onCheckout = async () => {

//     // Log entire event object
//     console.log("Event data:", event);

//     // Access event title correctly
//     const price = parseFloat(event.price);
//     if (isNaN(price)) {
//       throw new Error("Event price is invalid. Please check event data.");
//     }
//     // Now use the converted number
//     const priceInKobo = price * 100;

//     // Create payment details object with dynamic values
//     const paymentDetails = {
//       amount: priceInKobo,
//       email: userEmail,
//       // Use event currency if available, otherwise default
//       currency: "NGN",
//       // Add other relevant payment details here
//       // You can potentially include callback_url and channels if needed
//     };

//     setPaymentProcessing(true);

//     try {
//       const response = await paystackPay(paymentDetails);
//       // Handle successful response from paystackPay
//       console.log("Paystack response:", response);

//       if (response.status === true) {
//         // Handle successful payment (e.g., display confirmation message, redirect, etc.)
//         console.log("Payment successful!");
//       } else {
//         console.error("Payment failed:", response.message);
//       }
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//     } finally {
//       setPaymentProcessing(false);
//     }
//   };

//   return (
//     <>
//       {event.isFree ? (
//         <Button type="submit" role="link" size="lg" className="button sm:w-fit">
//           Get Ticket
//         </Button>
//       ) : (
//         <Button
//           className="bg-blue-700 text-white p-4 rounded-xl"
//           onClick={onCheckout}
//           disabled={paymentProcessing}
//         >
//           {paymentProcessing ? "Processing Payment..." : "Pay with Paystack"}
//         </Button>
//       )}
//     </>
//   );
// };

// export default Checkout;

"use client";
import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import { Button } from "../ui/button";
import { usePaystackPayment } from "react-paystack";

const config = {
  reference: new Date().getTime().toString(),
  email: "", // Initialize as undefined
  publicKey: "pk_test_6eed9e8bff39506d1bd2a648268573e89cf00ec6",
  title: "", // Initialize as undefined
  currency: "NGN",
  amount: 0, // Initialize as undefined,
};

const onSuccess = (reference: string) => {
  // Implement for success handling (e.g., update event status, display confirmation)
  console.log("Payment successful!", reference);
};

const onClose = () => {
  // Implement for payment closure handling (e.g., display cancellation message)
  console.log("Payment closed");
};

const Checkout = ({
  event,
  userId,
  userEmail,
}: {
  event: IEvent;
  userId: string;
  userEmail: string;
}) => {
  const initializePayment = usePaystackPayment(config);

  const onCheckout = async () => {
    console.log("Event data:", event); // Log entire event object

    // Access event title correctly
    config.title = event.title;

    // Ensure event.price exists and is a number
    const price = parseFloat(event.price); // Parse the string to a number
    if (isNaN(price)) {
      throw new Error("Event price is invalid. Please check event data.");
    }
    // Now use the converted number
    const priceInKobo = price * 100;
    config.amount = priceInKobo;

    // Get Email user purchasing
    config.email = userEmail;

    try {
      await initializePayment({
        // Assign onSuccess function directly
        onSuccess,
        // Assign onClose function directly
        onClose,
      });
    } catch (error) {
      // Handle payment errors
      console.error("Payment failed:", error);
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
