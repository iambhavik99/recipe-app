import './RecipeDetails.css';

import React, { useEffect, useState } from 'react';
import { Divider, Grid, IconButton } from "@mui/material";
import { useLocation } from 'react-router-dom';

import { RecipeIngredients } from '../../../UI/RecipeIngredients/RecipeIngredients.js';
import { RecipeSteps } from '../../../UI/RecipeSteps/RecipeSteps.js';
import axios from 'axios';
import RecommendIcon from '@mui/icons-material/Recommend';
import { AppIconButton } from '../../../UI/Button/Button';


export const RecipeDetails = () => {

    const { state } = useLocation();

    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        getRecipeById(state.id);
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

    const addReactions = async () => {
        const response = await axios
            .get(
                `http://localhost:3001/api/recipe/reactions/${state.id}`,
                {
                    headers: { Accept: 'application/json' }
                });
        setRecipe(response.data);
    }


    return (
        <React.Fragment>
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
                        <div className='recipe-header'>
                            <div className='recipe-name'>{recipe.name}</div>
                            <div>
                                <AppIconButton
                                    className="secondary-button small-button"
                                    icon={<RecommendIcon />}
                                    onClick={() => addReactions()} />
                                {recipe.reactions}
                            </div>
                        </div>
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