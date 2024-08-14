import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Dụng cụ nấu ăn tốt nhất cho gian bếp của bạn
        </h1>
        <p className="pt-5 text-[16px] font-[400] text-[#000000ba]">
          Hãy truy cập và trải nghiệm các mặt hàng hiện đại, chất lượng, với giá cả hợp lý phục vụ cho gian bếp của bạn. 
          {/* <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident. */}
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
  );
};

export default Hero;
