import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter, HashRouter} from "react-router-dom";
import "@/mock/index.js"


ReactDOM.createRoot(document.getElementById('root')).render(
    <HashRouter>
        <App />
    </HashRouter>
)
