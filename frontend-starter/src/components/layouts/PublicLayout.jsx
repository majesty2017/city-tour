import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider";

const PublicLayout= () => {
    const {token} = useStateContext()
    if (token) {
        return <Navigate to='/' />
    }
    return (
        <Outlet />
    )
}

export default PublicLayout
