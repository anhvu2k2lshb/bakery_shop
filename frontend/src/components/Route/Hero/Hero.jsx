import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,   
    prevArrow: <PreviousArrow />, // Sử dụng component mũi tên trái
    nextArrow: <NextArrow />, // Sử dụng component mũi tên phải

  };

  const banners = [
    {
      image: "https://themes.rslahmed.dev/rafcart/assets/images/banner-1.jpg",
      title: "Dụng cụ nấu ăn tốt nhất cho gian bếp của bạn",
      description: "Hãy truy cập và trải nghiệm các mặt hàng hiện đại, chất lượng, với giá cả hợp lý phục vụ cho gian bếp của bạn. ",
    },
    {
      image: "https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg",
      title: "Dụng cụ nấu ăn tốt nhất cho gian bếp của bạn",
      description: "Hãy truy cập và trải nghiệm các mặt hàng hiện đại, chất lượng, với giá cả hợp lý phục vụ cho gian bếp của bạn. ",
    },
    {
      image: "https://themes.rslahmed.dev/rafcart/assets/images/banner-3.jpg",
      title: "Dụng cụ nấu ăn tốt nhất cho gian bếp của bạn",
      description: "Hãy truy cập và trải nghiệm các mặt hàng hiện đại, chất lượng, với giá cả hợp lý phục vụ cho gian bếp của bạn. ",
    },
  ];

  return (
    <div className=" h-[400px]  ">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index}>
            <img src={banner.image} alt={banner.title} className="d-block text-center text-white bg-dark" style={{ width: "100%", height: "100%", bottom: "0" }} />
            <div className={`${styles.section} w-[90%] 800px:w-[60%] translate-y-[-140%] translate-x-[-25%]`}>
            <h1
              className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
              >
              {banner.title}
            </h1>
            <p className="pt-5 text-[16px] font-[400] text-[#000000ba]">
              {banner.description}
            </p>
            <Link to="/products" className="inline-block">
                <div className={`${styles.button} mt-5`}>
                     <span className="text-[#fff] text-[18px]">
                        Mua Ngay
                     </span>
                </div>
            </Link>
          </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const PreviousArrow = ({ className, style, onClick }) => (
  <div className={`${className}`} style={{ ...style, left: "10px", zIndex: 1 }} onClick={onClick}>
    ←
  </div>
);

const NextArrow = ({ className, style, onClick }) => (
  <div className={`${className}`} style={{ ...style, right: "10px", zIndex: 1 }} onClick={onClick}>
    →
  </div>
);

export default Hero;
