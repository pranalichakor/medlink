// StripeCheckout.jsx
import React, { useContext, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const StripeCheckout = ({ appointmentId, amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { backendUrl, token } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const res = await fetch(`${backendUrl}/api/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message || "Payment failed");
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // Update backend payment status
          await fetch(`${backendUrl}/api/appointment/pay/${appointmentId}`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success("Payment successful 🎉");
          onSuccess(); // update UI
        }
      }
    } catch (error) {
      toast.error("Something went wrong during payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-72">
      <CardElement />
      <button
        disabled={!stripe || loading}
        onClick={handlePayment}
        className="bg-[#5E5CE6] text-white px-4 py-1.5 rounded-md mt-2 w-full hover:bg-[#4e4cc4] transition"
      >
        {loading ? "Processing..." : "Pay here"}
      </button>
    </div>
  );
};

export default StripeCheckout;
