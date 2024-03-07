import {createBrowserRouter, createRoutesFromElements, Navigate, Route} from "react-router-dom";
import AuthPage from "./components/screens/auth/AuthPage.tsx";
import MainPage from "./components/screens/main/MainPage.tsx";
import OrderPage from "./components/screens/createOrder/OrderPage.tsx";
import ProfilePage from "./components/screens/profile/ProfilePage.tsx";
import OrdersPage from "./components/screens/checkOrders/OrdersPage.tsx";
import RegPage from "./components/screens/reg/RegPage.tsx";
import RequireAuth from "./hok/RequireAuth.tsx";

export const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path='/'>
            <Route path='auth' element={<AuthPage/>}/>
            <Route path='reg' element={<RegPage/>}/>

            <Route path='duties' element={<MainPage/>}/>
            <Route path='create-order' element={<OrderPage/>}/>

            <Route path='profile' element={
                <RequireAuth>
                    <ProfilePage/>
                </RequireAuth>
            }/>

            <Route path='check-orders' element={
                <RequireAuth roles={['Admin']}>
                    <OrdersPage/>
                </RequireAuth>
            }
            />

            <Route path="*" element={<Navigate to="/duties" replace={true}/>}/>
        </Route>
    ])
)