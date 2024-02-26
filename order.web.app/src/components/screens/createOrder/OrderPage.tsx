import DefaultPage from "../../ui/DefaultPage.tsx";
import {useTypedSelector} from "../../../store/hooks/hooks.ts";
import ClientOrderForm from "./ClientOrderForm.tsx";
import './style.scss'
import {useGetCategoriesQuery} from "../../../store/apis/categoryApi.ts";
import GuestOrderForm from "./GuestOrderForm.tsx";

const OrderPage = () => {

    const {data: categories} = useGetCategoriesQuery()
    const {user} = useTypedSelector(state => state.auth)

    return (
        <DefaultPage>
            {user ? <ClientOrderForm categories={categories!} user={user}/> :
                <GuestOrderForm categories={categories!}/>
            }
        </DefaultPage>
    );
};

export default OrderPage;