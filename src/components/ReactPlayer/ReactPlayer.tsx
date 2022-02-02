import React, {useEffect, useState} from 'react';
import styles from "../../App.module.css";
import ReactPlayer from "react-player";
import {NavLink} from "react-router-dom";
import {log} from "util";


export const ReactPlayerComponent = () => {

    const [showNavLink, setShowNavLink] = useState(false)

    const showBanner = (seconds: number) => {
        if (Math.round(seconds) > 5) {
            setShowNavLink(true)
        }
    }

    // useEffect(() => {
    //
    //     setTimeout(() => {
    //         setShowNavLink(true)
    //     }, 5000)
    // }, [showNavLink])

    return (
        <div className={styles.playerContainer}>
            <ReactPlayer height={'100%'}
                         width={'100%'}
                         controls
                         onProgress={state => showBanner(state.playedSeconds)}
                         url={'https://www.youtube.com/watch?v=M7FIvfx5J10'}
            />
            {showNavLink ? <NavLink to={'/presentation'} className={styles.bannerStyle}>тык сюда</NavLink> : ''}

        </div>
    );
};
