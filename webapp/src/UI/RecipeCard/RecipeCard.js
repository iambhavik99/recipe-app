import React from "react";
import { Card, Grid } from "@mui/material";

import './RecipeCard.css';


export const RecipeCard = (props) => {

    const handleClick = (id) => {
        props.onclick(id)
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