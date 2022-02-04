import React from 'react';
import {Keyboard, Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import styles from './SwiperComponent.module.css'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import imgForSwiper from '../../common/imgForSwiper.jpeg'

export const SwiperComponent = () => {

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