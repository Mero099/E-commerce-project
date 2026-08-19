import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Link } from "react-router-dom";

import "./Home.css";
import { Autoplay, Pagination } from "swiper/modules";


export default function HeroSlider() {
  return (
    <>
      <div className="hero">
        <div className="container">
          <Swiper
          loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={true}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="content">
                <h4>Introducing the new</h4>
                <h3>
                  Microsoft Xbox
                  <br /> 360 Controller{" "}
                </h3>
                <p>Windows Xp/10/7/8 Ps3, Tv Box</p>
                <Link to="/" className="btn">
                  Shop Now{" "}
                </Link>
              </div>
              <img src="/imag/img_3_banner_Hero1-CIV6Ws7x.jpg" alt="Slider" />
            </SwiperSlide>

            <SwiperSlide>
              <div className="content">
                <h4>Introducing the new</h4>
                <h3>
                  Microsoft Xbox
                  <br /> 360 Controller{" "}
                </h3>
                <p>Windows Xp/10/7/8 Ps3, Tv Box</p>
                <Link to="/" className="btn">
                  Shop Now{" "}
                </Link>
              </div>
              <img src="/imag/img_2_banner_Hero3-E2T8gV0U.jpg" alt="Slider" />
            </SwiperSlide>

            <SwiperSlide>
              <div className="content">
                <h4>Introducing the new</h4>
                <h3>
                  Microsoft Xbox
                  <br /> 360 Controller{" "}
                </h3>
                <p>Windows Xp/10/7/8 Ps3, Tv Box</p>
                <Link to="/" className="btn">
                  Shop Now{" "}
                </Link>
              </div>
              <img src="/imag/img_4_banner_Hero2-aoNmzKt0.jpg" alt="Slider" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
