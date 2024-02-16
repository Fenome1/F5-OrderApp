import {createBrowserRouter, Navigate} from "react-router-dom";
import AuthPage from "./components/screens/auth/AuthPage.tsx";
import MainPage from "./components/screens/main/MainPage.tsx";
import OrderPage from "./components/screens/order/OrderPage.tsx";

export const router = createBrowserRouter([
    {
        index: true,
        path: "/duties",
        element: <MainPage/>,
    },
    {
        path: "/auth",
        element: <AuthPage/>
    },
    {
        path: "/order",
        element: <OrderPage/>
    },
    {
        path: "*",
        element: <Navigate to="/duties" replace={true}/>
    }
]);