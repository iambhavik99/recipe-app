import React from "react";
import { Card, CardActions, Grid } from "@mui/material";

import './RecipeCard.css';
import { AppButton } from "../../UI/Button/Button";
import { getAccessToken } from "../../auth/auth";
import axios from "axios";


export const RecipeCard = (props) => {

    const handleClick = (path) => {
        props.onclick(path)
    }

    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${getAccessToken()}`
        }
    }

    const deleteRecipe = async (id) => {

        await axios.delete(`http://localhost:3001/api/recipe/${id}`, config)
            .then(() => {
                handleClick("/")
            })
            .catch(err => {

                if (err.response.status === 401) {
                    localStorage.clear();
                    handleClick("/")
                }

            })
    }

    const showActions = (id) => {
        return (
            <CardActions sx={{ padding: '4px !important' }}>
                <AppButton size="small" className="action-button" text="EDIT" onClick={() => handleClick('edit/' + id)} />
                <AppButton size="small" className="action-button" text="DELETE" onClick={() => deleteRecipe(id)} />
            </CardActions>
        );
    }


    return (
        <React.Fragment >

            <Grid container spacing={1} className='recipe-section' >
                {
                    props?.recipes?.items?.map((item, index) => {
                        return (
                            <Grid item
                                xs={2}
                                key={index}>
                                <Card className="recipe-card">
                                    <div style={{ position: 'relative' }} onClick={() => handleClick(item._id)}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="recipe-img"
                                        />
                                        <div className="recipe-title">
                                            {item.name}
                                        </div>
                                    </div>

                                    {props.role === 'admin' && showActions(item._id)}

                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>



        </React.Fragment >
    );
}