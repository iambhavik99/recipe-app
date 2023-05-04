import React, { useEffect, useState } from "react";
import axios from 'axios';

import { RecipeCard } from "../../../UI/RecipeCard/RecipeCard.js";
import { useNavigate } from "react-router-dom";
import { AppButtonRounded } from "../../../UI/Button/Button.js";

import RecipeCss from '../Recipe.module.css'

export const RecipesList = () => {

    const [recipes, setRecipes] = useState([]);
    const [role, setRole] = useState('user');
    const navigation = useNavigate();

    useEffect(() => {
        setRole(localStorage.getItem('access_lvl'))
        getRecipes();
    }, []);

    const clickHandler = (id) => {
        navigation('/recipe/item', { state: { id: id } });
    }

    const addRecipe = () => {
        navigation('/recipe/item/add')
    }

    const getRecipes = async () => {

        const response = await axios
            .get(
                'http://localhost:3001/api/recipe',
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
        setRecipes(response.data);
    }

    return (
        <React.Fragment>
            {role === 'admin' && <div className={RecipeCss["add-recipe-button"]}>
                < AppButtonRounded
                    type="button"
                    className="primary-button"
                    onClick={addRecipe}
                    text="Add recipe"
                />
            </div>
            }
            <RecipeCard recipes={recipes} onclick={clickHandler} />
        </React.Fragment >
    );
}