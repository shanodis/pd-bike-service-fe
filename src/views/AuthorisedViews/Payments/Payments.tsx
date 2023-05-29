import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Spinner } from 'react-bootstrap';
import CheckoutForm from './CheckoutForm';
import './Payments.css';
import { showErrorResponses } from '../../../utils/showErrorResponses';
import { useFetchData } from '../../../hooks/useFetchData';
import { OrderResponse } from '../../../interfaces/Order/OrderResponse';
import InvoiceDetails from './InvoiceDetails';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51L2aUxDtGLp5IXz7LpMLhLvpGIdlKvnQVxAzbbKzGH5qGWlzS3cgl5pGMmczgFhNDQ65M5eHxbLtBecaJut1mkuj009tqK2s4a'
);

interface PaymentResponse {
  clientSecret: string;
  totalPrice: number;
}

export default function Payments() {
  const [payment, setPayment] = useState<PaymentResponse>();
  const { clientSecret, totalPrice } = payment || {};
  const { orderId }: { orderId: string } = useParams();

  const generateSecret = useCallback(async () => {
    try {
      const { data } = await Axios.post<PaymentResponse>(
        `/orders/${orderId}/create-payment-intent`
      );
      setPayment(data);
    } catch (e) {
      showErrorResponses(e);
    }
  }, [orderId]);

  useEffect(() => {
    generateSecret().catch();
  }, [generateSecret]);

  const options: StripeElementsOptions = useMemo(
    () => ({
      clientSecret,
      appearance: {
        theme: 'stripe'
      }
    }),
    [clientSecret]
  );

  return (
    <div className="payment-wrapper">
      {payment ? (
        <>
          <InvoiceDetails />
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </>
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </div>
  );
}
