import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51KE6y3LVJcDHsRX1lhqhMb4p1qGH3uevSW3XxpG8HtSigILnH5bxDQekNilhfvpRtp2EGf4CpTY7iW2UB5ZKSZIQ00OM00T9gy");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "price_1KE816LVJcDHsRX10wdGgFwz" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm test={clientSecret}/>
        </Elements>
      )}
    </div>
  );
}