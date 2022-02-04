import React from "react";
import {SwiperComponent} from "../SwiperComponent/SwiperComponent";
import styles from './Presentation.module.css'
import {NavLink, useNavigate} from "react-router-dom";

export function Presentation() {
    const navigationToPreviousPage = useNavigate()

    return (
        <div className={styles.presentationContainer}>
            <div className={styles.swiperAndInfoContainer}>
                <SwiperComponent/>
                <div className={styles.infoContainer}>
                    <img
                        src={'https://thumbs.dreamstime.com/b/графика-с-информацией-о-вертикальной-временной-шкале-развитие-и-рост-157400232.jpg'}/>
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={() => navigationToPreviousPage(-1)}>ОТМЕНА</button>
                <NavLink to={'/get-shop-test/phone'}>
                    <button>ПОЛУЧИТЬ ПЕРСОНАЛЬНОЕ ПРЕДЛОЖЕНИЕ</button>
                </NavLink>
            </div>
        </div>
    );
}
