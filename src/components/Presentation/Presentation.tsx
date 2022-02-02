import React from "react";
import {SwiperComponent} from "../SwiperComponent/SwiperComponent";
import styles from './Presentation.module.css'

export function Presentation() {

    return (
        <div className={styles.presentationContainer}>
            <div className={styles.swiperAndInfoContainer}>
                <SwiperComponent/>
                <div className={styles.infoContainer}>
                    <img
                        src={'https://thumbs.dreamstime.com/b/графика-с-информацией-о-вертикальной-временной-шкале-развитие-и-рост-157400232.jpg'}/>
                    <button>ПОЛУЧИТЬ ПЕРСОНАЛЬНОЕ ПРЕДЛОЖЕНИЕ</button>
                </div>
            </div>
        </div>
    );
}
