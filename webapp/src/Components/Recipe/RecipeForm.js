import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppButton, AppIconButton } from "../../UI/Button/Button";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RecipeCss from './Recipe.module.css'
import { AppInputField, AppInputFieldMultiline } from "../../UI/Input/Input";
import { Grid } from "@mui/material";
import { getAccessToken } from "../../auth/auth";


const initialState = {
    name: '',
    ingredients: ['', '', '', ''],
    steps: ['', '']
}

const recipeReducerFunction = (state, action) => {
    debugger
    switch (action.type) {
        case 'steps':

            var { steps } = state;

            if (action.action === 'add') {
                steps.push('');
            }
            else if (action.action === 'update') {
                steps[action.index] = action.step;
            }
            else if (action.action === 'delete') {
                steps.splice(action.index, 1);
            }
            state = { ...state, steps }
            return state;

        case 'ingredient':
            var { ingredients } = state;

            if (action.action === 'add') {
                ingredients.push('');
            }
            else if (action.action === 'update') {
                ingredients[action.index] = action.ingredient;
            }
            else if (action.action === 'delete') {
                ingredients.splice(action.index, 1);
            }

            state = { ...state, ingredients }
            return state;

        default:
            state = action.state
            return state;
    }

}


const RecipeForm = (props) => {

    const [recipe, dispatchRecipe] = useReducer(recipeReducerFunction, initialState);
    const [error, setError] = useState('');
    const [image, setImage] = useState({ file: '', dataUrl: '' });
    const inputFile = useRef(null);

    const id = props?.id;

    const navigation = useNavigate();

    useEffect(() => {

        async function fetchData() {
            const response = await axios
                .get(
                    `http://localhost:3001/api/recipe/${id}`,
                    {
                        headers: { Accept: 'application/json' }
                    });

            const responseData = response.data;

            dispatchRecipe({ state: { ...responseData } });
            setImage({ dataUrl: responseData.image })
        }


        if (id) {
            fetchData();
        }

    }, [id])

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const payload = {
            ...recipe,
            image: image.dataUrl
        }

        const config = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${getAccessToken()}`
            }
        }

        const promise = id ? axios.put(`http://localhost:3001/api/recipe/${id}`, payload, config) : axios.post(`http://localhost:3001/api/recipe`, payload, config)

        promise
            .then(() => {
                navigation('/');
            })
            .catch(err => {

                setError(err.response.data.error);
                if (err.response.status === 401) {
                    localStorage.clear();
                    navigation('/')
                }

                setTimeout(() => { setError("") }, 2000);
            })
    }

    const blobToBase64 = async (event) => {
        const file = event?.target?.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                setImage({
                    file: file,
                    dataUrl: event.target.result
                })
            }
        }
        else {
            setImage({ file: '', dataUrl: '' })
        }
    }

    const addIcon = (type, action, index) => {
        return index === 0 && (
            <div style={{ paddingLeft: 6, display: 'inline-block' }}>
                <AppIconButton
                    className="svg-icon-button"
                    icon={<AddIcon />}
                    onClick={() => dispatchRecipe({ type, action })} />
            </div>
        );
    }

    const removeIcon = (type, action, index) => {
        return index !== 0 && (
            <div style={{ paddingLeft: 6, display: 'inline-block' }}>
                <AppIconButton
                    className="svg-icon-button"
                    icon={<RemoveIcon />}
                    onClick={() => dispatchRecipe({ type, action, index })} />
            </div>
        );
    }

    const imgElement = (image) => {
        if (!image.dataUrl) {
            return (
                <div
                    className={RecipeCss["recipe-image-div"]}>
                    <input
                        type='file'
                        id='file'
                        ref={inputFile}
                        style={{ display: 'none' }}
                        onChange={(e) => blobToBase64(e)} />
                    <AppButton
                        style={{ width: 'auto' }}
                        className="secondary-button"
                        text="Upload image"
                        onClick={() => inputFile?.current?.click()} />
                </div>

            );
        }
        return (
            <img src={image.dataUrl} alt="recipe" className={RecipeCss["recipe-image"]} />
        );
    }

    return (
        <div style={{ padding: 12 }}>
            <form onSubmit={onSubmitHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        {imgElement(image)}
                    </Grid>

                    <Grid item xs={9}>
                        <AppInputField
                            id="recipe-name"
                            type="text"
                            value={recipe.name}
                            onChange={(e) => dispatchRecipe({ state: { ...recipe, name: e.target.value } })}
                            label="Name"
                            size="small"
                            className="login-input"
                        />
                        <Grid container>
                            {
                                recipe?.ingredients?.map((ingredient, index) => {
                                    return (
                                        <Grid item xs={6} key={index} className={RecipeCss["input-icon-wrapper"]}>
                                            <AppInputField
                                                type="text"
                                                value={ingredient}
                                                onChange={(e) => dispatchRecipe({ type: 'ingredient', action: 'update', index: index, ingredient: e.target.value })}
                                                label="Ingredient"
                                                size="small"
                                                className="login-input"
                                            />
                                            <div>
                                                {addIcon('ingredient', 'add', index)}
                                                {removeIcon('ingredient', 'delete', index)}
                                            </div>
                                        </Grid>)
                                })
                            }
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        {
                            recipe?.steps?.map((step, index) => {
                                return <div key={index} className={RecipeCss["input-icon-wrapper"]} style={{ width: '80%' }}>
                                    <AppInputFieldMultiline
                                        type="text"
                                        value={step}
                                        onChange={(e) => dispatchRecipe({ type: 'steps', action: 'update', index: index, step: e.target.value })}
                                        label="Step"
                                        className="login-input"
                                        multiline
                                        style={{ width: '100%' }}
                                        maxRows={4}
                                    />
                                    {addIcon('steps', 'add', index)}
                                    {removeIcon('steps', 'delete', index)}
                                </div>
                            })
                        }

                    </Grid>

                </Grid>

                <div style={{ marginTop: 12 }}>
                    <AppButton
                        type="submit"
                        className="primary-button"
                        variant="text"
                        text="Save"
                    />

                    <AppButton
                        style={{ marginLeft: 6 }}
                        type="button"
                        className="secondary-button"
                        variant="text"
                        text="Cancel"
                        onClick={() => navigation('/')}
                    />
                </div>
            </form>

            <div>
                {error && <p>{error}</p>}
            </div>
        </div >

    );

}

export default RecipeForm;