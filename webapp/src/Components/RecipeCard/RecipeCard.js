import React from "react";
import { Card, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import './RecipeCard.css';


export const RecipeCard = (props) => {

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/recipe/item`, { state: { id: id } });
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
                                <Card
                                    onClick={() => handleClick(item._id)}
                                    className="recipe-card">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="recipe-img"
                                    />
                                    <div className="recipe-title">
                                        {item.name}
                                    </div>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>



        </React.Fragment >
    );
}