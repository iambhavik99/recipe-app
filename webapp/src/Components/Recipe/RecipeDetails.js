import RecipeCss from './Recipe.module.css';

import React, { useEffect, useState } from 'react';
import { Divider, Grid } from "@mui/material";

import axios from 'axios';
import RecommendIcon from '@mui/icons-material/Recommend';
import { AppIconButton } from '../../UI/Button/Button';
import { RecipeIngredients } from '../RecipeIngredients/RecipeIngredients';
import { RecipeSteps } from '../RecipeSteps/RecipeSteps';


export const RecipeDetails = (props) => {

    const id = props.id;

    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        getRecipeById(id);
    }, [id]);


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
                `http://localhost:3001/api/recipe/reactions/${id}`,
                {
                    headers: { Accept: 'application/json' }
                });
        setRecipe(response.data);
    }


    return (
        <React.Fragment>
            <div className={RecipeCss['recipe-detail-page']}>
                <Grid container
                    spacing={2}>

                    <Grid item xs={3}>
                        <img
                            src={recipe.image}
                            alt={recipe.name}
                            className={RecipeCss['recipe-image']}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <div className={RecipeCss['recipe-header']}>
                            <div className={RecipeCss['recipe-name']}>{recipe.name}</div>
                            <div>
                                <AppIconButton
                                    className="svg-icon-button"
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