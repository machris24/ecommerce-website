import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";

export default function Logout() {

    const { unsetUser, setUser } = useContext(UserContext);

    // localStorage.clear();
    unsetUser();

    useEffect(() => {
        setUser({id:null})
    }, [setUser])

    return (

        // Redirects user back to the login page
        <Navigate to="/" />

    )
}