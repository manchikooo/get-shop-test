import React from 'react';
import styles from './GetShopTestApp.module.css'
import {ReactPlayerComponent} from "./components/ReactPlayer/ReactPlayer";
import {Routes, Route} from "react-router-dom";
import {Presentation} from "./components/Presentation/Presentation";
import {PhonePage} from "./components/PhonePage/PhonePage";

export const GetShopTestApp = () => {
    return (
        <div className={styles.GetShopTestAppStyles}>
            <Routes>
                <Route path='/get-shop-test/' element={<ReactPlayerComponent/>}/>
                <Route path='/get-shop-test/presentation' element={<Presentation/>}/>
                <Route path='/get-shop-test/phone' element={<PhonePage/>}/>
            </Routes>
        </div>
    );
}
