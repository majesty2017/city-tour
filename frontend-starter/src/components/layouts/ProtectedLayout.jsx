import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider";

const ProtectedLayout= () => {
    const {token} = useStateContext()
    if (!token) {
        return <Navigate to='/login' />
    }
    return (
        <Outlet />
    )
}

export default ProtectedLayout
