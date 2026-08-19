import React from 'react'
import Product from './Product'
import "./SlideProduct.css"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Autoplay ,Navigation  } from 'swiper/modules';



export default function SlideProduct({ data, title }) {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <>
      <div className="slide_Product">
        <div className="container">
          <div className="top_slide">
            <h2>{title}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit Tempora deleniti.</p>
          </div>

          <Swiper
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            slidesPerView={5}
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {safeData.map((item, index) => (
              <SwiperSlide key={item?.id || index}>
                <Product item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
