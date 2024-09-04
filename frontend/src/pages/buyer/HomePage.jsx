import React, { useEffect } from 'react'
import Header from "../../components/Layout/Header";
import Hero from "../../components/Route/Hero/Hero";
import Categories from "../../components/Route/Categories/Categories";
import BestDeals from "../../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../../components/Events/Events";
import Sponsored from "../../components/Route/Sponsored";
import Footer from "../../components/Layout/Footer";
import Store from "../../redux/store";
import { loadSeller, loadUser } from "../../redux/actions/user";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  
  return (
    <div>
        <Header activeHeading={1} />
        <Hero />
        <Categories />
        <BestDeals />
        <Events />
        <FeaturedProduct />
        <Footer />
    </div>
  )
}
