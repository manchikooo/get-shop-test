import React, {useState} from 'react';
import {Keyboard, Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import styles from './SwiperComponent.module.css'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {useNavigate} from "react-router-dom";

export const SwiperComponent = () => {
    const imgForSwiper = 'https://icdn.lenta.ru/images/2021/04/27/16/20210427163138131/square_320_c09ebae17387b7d6eeb9fa0d42afe5ee.jpg'

    return (
        <div className={styles.swiperContainer}>
            <Swiper
                slidesPerView={1}
                spaceBetween={50}
                keyboard={{
                    enabled: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Keyboard, Pagination, Navigation]}
                className={styles.mySwiper}
            >

                <SwiperSlide className={styles.swiperElement}>
                    <img src={imgForSwiper} alt='swiper img 1'/>
                    <h2>Some text 1</h2>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperElement}>
                    <img src={imgForSwiper} alt='swiper img 2'/>
                    <h2>Some text 2</h2>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperElement}>
                    <img src={imgForSwiper} alt='swiper img 3'/>
                    <h2>Some text3</h2>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperElement}>
                    <img src={imgForSwiper} alt='swiper img 4'/>
                    <h2>Some text 4</h2>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperElement}>
                    <img src={imgForSwiper} alt='swiper img 5'/>
                    <h2>Some text 5</h2>
                </SwiperSlide>
            </Swiper>
        </div>
    )
};