import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import {router} from "./Router.tsx";
import {persistor, store} from "./store/store.ts";
import {PersistGate} from "redux-persist/integration/react";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <PersistGate loading={null} persistor={persistor}>
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </PersistGate>
    </React.StrictMode>,
)
