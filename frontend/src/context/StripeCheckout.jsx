import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const StripeCheckout = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/create-payment`, { amount });

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert("Payment failed: " + result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("Payment successful! 🎉");
      }
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay ₹{amount}</button>
    </form>
  );
};

export default StripeCheckout;
