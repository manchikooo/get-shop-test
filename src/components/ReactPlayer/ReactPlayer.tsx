import React, {useState} from 'react';
import styles from "../../GetShopTestApp.module.css";
import ReactPlayer from "react-player";
import {NavLink} from "react-router-dom";
import bannerImg from '../../common/banner.png'

export const ReactPlayerComponent = () => {

    const [showNavLink, setShowNavLink] = useState(false)

    const showBanner = (seconds: number) => {
        if (Math.round(seconds) > 5) {
            setShowNavLink(true)
        }
    }

    return (
        <div className={styles.playerContainer}>
            <ReactPlayer height={'100%'}
                         width={'100%'}
                         playing={true}
                         volume={0}
                         muted={true}
                         onProgress={state => showBanner(state.playedSeconds)}
                         url={'https://vimeo.com/79403681'}
            />
            {showNavLink &&
                <NavLink to={'/get-shop-test/presentation'}
                         className={styles.bannerStyle}>
                    <img alt='banner' src={bannerImg}/>
                </NavLink>}
        </div>
    );
};
