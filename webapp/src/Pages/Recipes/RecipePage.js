import { useLoaderData, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../auth/auth";
import { AppButton } from "../../UI/Button/Button";
import { RecipeCard } from "../../Components/RecipeCard/RecipeCard";

const RecipePage = () => {
    const { role } = useLoaderData();

    const [recipes, setRecipes] = useState([]);
    const navigation = useNavigate();

    useEffect(() => {
        getRecipes();
    }, []);

    const clickHandler = (id) => {
        navigation('/recipe/' + id);
    }


    const showAddNewRecipeAction = () => {
        return (
            role === 'admin' && (
                <div style={{ padding: '12px 6px' }} >
                    <AppButton
                        style={{ width: '100%' }}
                        text="Add new Recipe"
                        className="primary-button"
                        onClick={() => navigation('/recipe/new')}
                    />
                </div>
            )
        )
    }


    const getRecipes = async () => {

        const response = await axios
            .get(
                'http://localhost:3001/api/recipe',
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${getAccessToken()}`
                    }
                });
        setRecipes(response.data);
    }

    return (
        <Fragment>
            {showAddNewRecipeAction()}
            <RecipeCard recipes={recipes} onclick={clickHandler} role={role} />
        </Fragment>
    );

}

export default RecipePage;