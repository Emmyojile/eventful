import React from "react";
import Image from "next/image";
import { PaystackButton } from "react-paystack";

const PayStackPage = () => {
  return (
    <div className="container">
      <div className="item">
        <div className="overlay-effect"></div>
        <Image
          src="/empty-cart.png"
          width={128}
          height={108}
          className="item-image"
          alt="product"
        />
        <div className="item-details">
          <p className="item-details__title">Coconut Oil</p>
          <p className="item-details__amount">NGN{100}</p>
          {/* <p className="item-details__amount">NGN{amount / 100}</p> */}
        </div>
      </div>
      <div className="checkout">
        <div className="checkout-form">
          <div className="checkout-field">
            <label>Name</label>
            <input />
          </div>
          <div className="checkout-field">
            <label>Email</label>
            <input />
          </div>
          <div className="checkout-field">
            <label>Phone</label>
            <input />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayStackPage;
