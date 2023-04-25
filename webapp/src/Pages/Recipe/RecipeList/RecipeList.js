import React, { useEffect, useState } from "react";
import axios from 'axios';

import { RecipeCard } from "../../../Components/RecipeCard/RecipeCard";
import { Header } from "../../../Components/Header/Header";

export const RecipesList = () => {

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        getRecipes();
    }, [])

    const getRecipes = async () => {

        const response = await axios
            .get(
                'http://localhost:3001/api/recipe',
                {
                    headers: { Accept: 'application/json' }
                });
        setRecipes(response.data);
    }




    return (
        <React.Fragment>
            <Header />
            <RecipeCard recipes={recipes} />
        </React.Fragment>
    );
}