import {createBrowserRouter, Navigate} from "react-router-dom";
import AuthPage from "./components/screens/auth/AuthPage.tsx";
import MainPage from "./components/screens/main/MainPage.tsx";
import OrderPage from "./components/screens/createOrder/OrderPage.tsx";
import ProfilePage from "./components/screens/profile/ProfilePage.tsx";
import OrdersPage from "./components/screens/orders/OrdersPage.tsx";

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
        path: "/create-order",
        element: <OrderPage/>
    },
    {
        path: "/profile",
        element: <ProfilePage/>
    },
    {
        path: "/orders",
        element: <OrdersPage/>
    },
    {
        path: "*",
        element: <Navigate to="/duties" replace={true}/>
    }
]);