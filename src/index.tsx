import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GetShopTestApp from './GetShopTestApp';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
            <GetShopTestApp/>
    </BrowserRouter>,
    document.getElementById('root')
);

