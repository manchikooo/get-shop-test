import React from "react";
import {SwiperComponent} from "../SwiperComponent/SwiperComponent";
import styles from './Presentation.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import presentationInfo from '../../common/presentationInfo.png'

export function Presentation() {
    const navigationToPreviousPage = useNavigate()

    return (
        <div className={styles.presentationContainer}>
            <div className={styles.swiperWithBackButtonContainer}>
                <div className={styles.swiperWithBackButtonBlock}>
                    <SwiperComponent/>
                    <button onClick={() => navigationToPreviousPage(-1)}>
                        ОТМЕНА
                    </button>
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <div className={styles.infoContainer}>
                    <img alt='presentationInfo image'
                        src={presentationInfo}/>
                </div>
                <NavLink className={styles.personalOfferButton} to={'/get-shop-test/phone'}>
                    ПОЛУЧИТЬ ПЕРСОНАЛЬНОЕ ПРЕДЛОЖЕНИЕ
                </NavLink>
            </div>
        </div>
    );
}
