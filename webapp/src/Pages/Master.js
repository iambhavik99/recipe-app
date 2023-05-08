import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { Header } from "../UI/Header/Header.js";

export const Master = () => {
    const navigation = useNavigate();

    const loggedInUserInfo = useLoaderData();

    const handleNavigation = (path) => {
        navigation(path);
    };

    return (
        <>
            <Header navigate={handleNavigation} loggedInUserInfo={loggedInUserInfo} />
            <Outlet />
        </>
    );
}