import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import { StoreProvider, stores } from "@/store/index.js";
import "@/mock/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <HashRouter>
        <StoreProvider value={stores}>
            <App />
        </StoreProvider>
    </HashRouter>
);
