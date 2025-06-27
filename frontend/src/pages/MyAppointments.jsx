import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [payingAppointment, setPayingAppointment] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/appointment/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setAppointments(data.appointments);
        else toast.error(data.message);
      } catch {
        toast.error("Failed to load appointments");
      }
    };

    fetchAppointments();
  }, [backendUrl, token]);

  const handleCancel = async (id) => {
    try {
      const res = await fetch(`${backendUrl}/api/appointment/cancel/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Appointment cancelled");
        setAppointments((prev) => prev.filter((a) => a._id !== id));
      } else toast.error(data.message);
    } catch {
      toast.error("Error cancelling appointment");
    }
  };

  const handlePay = async (id, amount) => {
    try {
      const res = await fetch(`${backendUrl}/api/payment/create-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();
      if (!data.success) return toast.error("Error creating payment");

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        return toast.error("Payment failed");
      }

      if (result.paymentIntent.status === 'succeeded') {
        const confirmRes = await fetch(`${backendUrl}/api/appointment/pay/${id}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        });

        const confirmData = await confirmRes.json();
        if (confirmData.success) {
          toast.success("Payment successful");
          setAppointments((prev) =>
            prev.map((a) => (a._id === id ? { ...a, paymentStatus: 'paid' } : a))
          );
          setPayingAppointment(null);
        } else toast.error(confirmData.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error in payment");
    }
  };

  return (
    <div className="p-4 sm:p-6 relative bg-[#030f2e] min-h-screen text-[#e0f7ff]">
      <h2 className="text-xl font-bold mb-6 text-[#00eaff] text-center">My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-[#9dbfd6] text-center">No appointments found.</p>
      ) : (
        appointments.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#00b4d8] py-6 mb-4 bg-[#0f1d4d] rounded-xl px-4 shadow">
            <div className="flex items-start gap-4">
              <img src={item.doc?.image} alt="Doctor" className="w-20 h-20 rounded-lg object-cover border border-[#00b4d8]" />
              <div>
                <p className="font-semibold text-[#00eaff]">Dr. {item.doc?.name?.replace(/^Dr\.?\s*/i, '') || "Unknown"}</p>
                <p className="text-sm text-[#cdefff]">{item.doc?.speciality || "N/A"}</p>
                <p className="text-sm text-[#9dbfd6] mt-2">Address:</p>
                <p className="text-sm text-[#cdefff]">
                  {typeof item.doc?.address === 'string'
                    ? item.doc?.address
                    : (item.doc?.address?.line1 && item.doc?.address?.line2)
                      ? `${item.doc.address.line1}, ${item.doc.address.line2}`
                      : "N/A"}
                </p>
                <p className="text-sm text-[#9dbfd6] mt-2">
                  <span className="font-medium text-[#e0f7ff]">Date & Time:</span> {item.slotDate} | {item.slotTime}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 mt-4 sm:mt-0">
              {item.paymentStatus === 'not paid' && (
                <button
                  onClick={() => setPayingAppointment(item)}
                  className="bg-[#00eaff] text-[#030f2e] px-4 py-1.5 rounded-md w-32 hover:opacity-90 transition font-medium"
                >
                  Pay Now
                </button>
              )}
              {item.paymentStatus === 'paid' && (
                <button disabled className="bg-green-500 text-white px-4 py-1.5 rounded-md w-32 font-medium">Paid</button>
              )}
              <button
                onClick={() => handleCancel(item._id)}
                className="border border-red-500 text-sm text-red-400 px-4 py-1.5 rounded-md w-32 hover:bg-red-500 hover:text-white transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        ))
      )}

      {/* Payment Modal */}
      {payingAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#0f1d4d] p-6 rounded-xl w-full max-w-md shadow-lg border border-[#00b4d8] text-white">
            <h3 className="font-semibold mb-3 text-lg text-[#00eaff]">
              Pay ₹{payingAppointment.doc?.fees || 50} to confirm your appointment
            </h3>
            <CardElement className="p-3 bg-[#112b5f] text-white border border-[#00eaff] rounded shadow mb-4" />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => handlePay(payingAppointment._id, payingAppointment.doc?.fees || 50)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setPayingAppointment(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
