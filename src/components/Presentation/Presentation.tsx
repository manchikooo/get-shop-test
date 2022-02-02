import React from "react";
import {SwiperComponent} from "../SwiperComponent/SwiperComponent";
import styles from './Presentation.module.css'

export function Presentation() {
    return (
        <div className={styles.presentationContainer}>
            <div className={styles.swiperAndButtonContainer}>
                <SwiperComponent/>
            </div>
            <div className={styles.buttonsContainer}>
                <button>ОТМЕНА</button>
                <button>ПОЛУЧИТЬ ПЕРСОНАЛЬНОЕ ПРЕДЛОЖЕНИЕ</button>
            </div>
        </div>
    );
}
