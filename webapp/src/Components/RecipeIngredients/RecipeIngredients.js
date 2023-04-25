import { Grid } from "@mui/material"

import './RecipeIngredients.css'

export const RecipeIngredients = (props) => {

    return (
        <div>
            <div className='recipe-ingredients-title'>Ingredients</div>
            <Grid container spacing={2} style={{ padding: 16 }}>
                {
                    props.ingredients?.map((ingredient, index) => <Grid
                        item
                        xs={6}
                        className='recipe-ingredients'
                        key={index}>
                        <li>{ingredient}</li>
                    </Grid>
                    )
                }
            </Grid>
        </div>
    )

}