import React from 'react';
import styles from './App.module.css'
import {ReactPlayerComponent} from "./components/ReactPlayer/ReactPlayer";
import {Routes, Route} from "react-router-dom";
import {Presentation} from "./components/Presentation/Presentation";

function App() {


    return (
        <div className={styles.App}>
            <Routes>
                <Route path='/' element={<ReactPlayerComponent/>}/>
                <Route path='/presentation' element={<Presentation/>}/>
            </Routes>
        </div>
    );
}

export default App;
