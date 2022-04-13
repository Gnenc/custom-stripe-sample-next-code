import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51Jx7MdCLqTddqkBlkGOWJGUQVtkn0LiY3LMHcZBK0jS0HxtHzIV11NYRHBa4BgY6RdmYfEdnrunBbKhkZkmIVVkk00Fj2UD2zA");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  /*useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "price_1KE816LVJcDHsRX10wdGgFwz" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);*/

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      <form>
        <label>Client Secret: </label>
        <input value={clientSecret} onChange={e => setClientSecret(e.target.value)} type="text" />
      </form>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm test={clientSecret}/>
        </Elements>
      )}
    </div>
  );
}