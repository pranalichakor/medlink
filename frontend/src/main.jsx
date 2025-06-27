import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';

// ✅ Stripe setup
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// ✅ Load Stripe using your public key from `.env`
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// ✅ Render your app inside the Elements provider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </Elements>
    </BrowserRouter>
  </React.StrictMode>
);
