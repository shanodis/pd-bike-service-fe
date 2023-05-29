import React, { useEffect, useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Axios from 'axios';
import { showErrorResponses } from '../../../utils/showErrorResponses';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { orderId }: { orderId: string } = useParams();
  const { t } = useTranslation();

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then((payment: any) => {
      switch (payment.paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      await Axios.post(`/orders/${orderId}/complete-payment`);
    } catch (err) {
      showErrorResponses(err);
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/orders/${orderId}/invoice`
      }
    });

    if (error.type === 'card_error' || error?.type === 'validation_error') {
      setMessage(error?.message || '');
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <>
      <h1 className="text-center">{t('orders.checkout')}</h1>
      <form id="payment-form" className="paymentForm" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />

        <button
          className="paymentButton"
          type="submit"
          disabled={isLoading || !stripe || !elements}
          id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner" /> : 'Pay now'}
          </span>
        </button>

        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}
