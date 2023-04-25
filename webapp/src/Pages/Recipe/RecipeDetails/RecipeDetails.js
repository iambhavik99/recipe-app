import './RecipeDetails.css';

import React, { useEffect, useState } from 'react';
import { Button, Divider, Grid } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';

import { RecipeIngredients } from '../../../Components/RecipeIngredients/RecipeIngredients';
import { RecipeSteps } from '../../../Components/RecipeSteps/RecipeSteps';
import axios from 'axios';
import { Header } from '../../../Components/Header/Header';


export const RecipeDetails = () => {

    const { state } = useLocation();

    const [recipe, setRecipe] = useState({});
    const navigation = useNavigate({});

    useEffect(() => {
        getRecipeById(state.id)
    }, [state.id]);


    const getRecipeById = async (id) => {

        const response = await axios
            .get(
                `http://localhost:3001/api/recipe/${id}`,
                {
                    headers: { Accept: 'application/json' }
                });
        setRecipe(response.data);
    }


    return (
        <React.Fragment>
            <Header />
            <div className='recipe-detail-page'>
                <Grid container
                    spacing={2}>

                    <Grid item xs={3}>
                        <img
                            src={recipe.image}
                            alt={recipe.name}
                            className='recipe-image'
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <div className='recipe-name'>{recipe.name}</div>
                        <Divider />
                        <RecipeIngredients ingredients={recipe.ingredients} />
                    </Grid>

                </Grid>
                <Grid container>
                    <RecipeSteps steps={recipe.steps} />
                </Grid>
            </div>

        </React.Fragment >
    );
}