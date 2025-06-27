// components/CardPaymentModal.jsx
import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

const CardPaymentModal = ({ appointmentId, amount, backendUrl, token, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      const res = await fetch(`${backendUrl}/api/payment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();
      if (!data.success) return toast.error(data.message || "Payment failed");

      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        toast.success('Payment successful');

        await fetch(`${backendUrl}/api/appointment/pay/${appointmentId}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
        });

        onSuccess();
        onClose();
      }
    } catch (error) {
      toast.error('Error processing payment');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Enter Card Details</h3>
        <div className="border p-3 rounded mb-4">
          <CardElement />
        </div>
        <div className="flex justify-between">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={!stripe}
          >
            Pay ₹{amount}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardPaymentModal;
