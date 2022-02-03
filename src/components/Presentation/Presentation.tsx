import React from "react";
import {SwiperComponent} from "../SwiperComponent/SwiperComponent";
import styles from './Presentation.module.css'
import {NavLink} from "react-router-dom";

export function Presentation() {

    return (
        <div className={styles.presentationContainer}>
            <div className={styles.swiperAndInfoContainer}>
                <SwiperComponent/>
                <div className={styles.infoContainer}>
                    <img
                        src={'https://thumbs.dreamstime.com/b/графика-с-информацией-о-вертикальной-временной-шкале-развитие-и-рост-157400232.jpg'}/>
                    <NavLink to={'/phone'}><button>ПОЛУЧИТЬ ПЕРСОНАЛЬНОЕ ПРЕДЛОЖЕНИЕ</button></NavLink>
                </div>
            </div>
        </div>
    );
}
