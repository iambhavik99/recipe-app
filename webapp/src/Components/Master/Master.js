import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../UI/Header/Header.js";

export const Master = () => {
    const navigation = useNavigate();

    const handleNavigation = (path) => {
        navigation(path);
    };

    return (
        <>
            <Header navigate={handleNavigation} />
            <Outlet />
        </>
    );
}