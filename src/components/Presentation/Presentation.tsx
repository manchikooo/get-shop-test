import React from "react";
import {SwiperComponent} from "../SwiperComponent/SwiperComponent";
import styles from './Presentation.module.css'
import {NavLink, useNavigate} from "react-router-dom";

export function Presentation() {
    const navigationToPreviousPage = useNavigate()

    // let shift = prevState + 3;
    // if (prevState)
    //     if (prevState < 11) shift = prevState + 3;
    // if (items[cursor].id === 9) shift = prevState + 2;
    // if (items[cursor].id >= 10) shift = prevState + 1;
    // return shift;


    // (prevState > 2 ? prevState - 3 : prevState)


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
