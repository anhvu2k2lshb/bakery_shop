import React from 'react'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import UserOrderDetails from "../../components/Order/UserOrderDetails";

export const OrderDetailsPage = () => {
  return (
    <div>
        <Header />
        <UserOrderDetails />
        <Footer />
    </div>
  )
}

