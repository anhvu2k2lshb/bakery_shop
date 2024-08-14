import React from 'react'
import Header from '../../components/Layout/Header'
import CheckoutSteps from "../../components/Checkout/CheckoutSteps";
import Checkout from "../../components/Checkout/Checkout";
import Footer from '../../components/Layout/Footer';

export const CheckoutPage = () => {
  return (
    <div>
        <Header />
        <br />
        <br />
        <CheckoutSteps active={1} />
        <Checkout />
        <br />
        <br />
        <Footer />
    </div>
  )
}
