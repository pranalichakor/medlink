import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripePayment = async (req, res) => {
  try {
    let { amount } = req.body;

    // Ensure amount is a valid number
    amount = Number(amount);
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    // Stripe minimum amount is ₹50 (i.e., 5000 paise)
    if (amount < 50) {
      amount = 50;
      // console.log("Amount too low, using minimum ₹50");
    }

    // console.log("Final amount being charged:", amount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe works in paise
      currency: 'inr',
      payment_method_types: ['card'],
    });

    // console.log("PaymentIntent created:", paymentIntent.id);

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(500).json({ success: false, message: "Payment failed" });
  }
};
