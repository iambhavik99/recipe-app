import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "../../Components/Header/Header";
import { RecipesList } from "./RecipeList/RecipeList";
import { RecipeDetails } from "./RecipeDetails/RecipeDetails";

export const Recipe = () => {
    return (
        <React.Fragment>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RecipesList />} />
                    <Route path="/recipe/item" element={<RecipeDetails />} />
                </Routes>
            </BrowserRouter>

            <Outlet />

        </React.Fragment>
    );
}