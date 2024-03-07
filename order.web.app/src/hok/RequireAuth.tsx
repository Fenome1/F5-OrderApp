import {FC, ReactNode} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useTypedSelector} from "../store/hooks/hooks.ts";

interface RequireAuthProps {
    roles?: string[]
    children: ReactNode
}

const RequireAuth: FC<RequireAuthProps> = ({children, roles}) => {
    const location = useLocation()
    const {user} = useTypedSelector(state => state.auth)

    if (!user) {
        return <Navigate to='/auth' state={{form: location}}/>
    }

    if (roles && !roles.includes(user.role.title)) {
        return <Navigate to='/auth'/>
    }

    return children
};

export default RequireAuth;