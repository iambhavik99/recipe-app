import { Grid } from "@mui/material";
import axios from "axios";
import { useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppButton, AppIconButton } from "../../../UI/Button/Button";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import RecipeCss from '../Recipe.module.css'
import { AppInputField, AppInputFieldMultiline } from "../../../UI/Input/Input";

const initialState = {
    name: '',
    ingredients: ['', '', '', ''],
    steps: ['', '']
}
const recipeReducerFunction = (state, action) => {
    if (action.type === 'UPDATE_STEPS') {
        let { steps } = state;
        steps[action.index] = action.step;
        state = { ...state, steps }
        return state;
    }
    else if (action.type === 'UPDATE_INGREDIENT') {
        let { ingredients } = state;
        ingredients[action.index] = action.ingredient;
        state = { ...state, ingredients }
        return state;
    }
    else if (action.type === 'ADD_STEP') {
        let { steps } = state;
        steps.push('');
        state = { ...state, steps }
        return state;
    }
    else if (action.type === 'ADD_INGREDIENT') {
        let { ingredients } = state;
        ingredients.push('');
        state = { ...state, ingredients }
        return state;
    }
    else if (action.type === 'DELETE_STEP') {
        let { steps } = state;
        steps.splice(action.index, 1);
        state = { ...state, steps }
        return state;
    }
    else if (action.type === 'DELETE_INGREDIENT') {
        let { ingredients } = state;
        ingredients.splice(action.index, 1);
        state = { ...state, ingredients }
        return state;
    }
    else {
        state = action.state
        return state
    }

}




const AddEditRecipe = () => {
    const [recipe, dispatchRecipe] = useReducer(recipeReducerFunction, initialState);
    const [error, setError] = useState('');
    const [image, setImage] = useState({ file: '', dataUrl: '' });
    const inputFile = useRef(null)

    const navigation = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const payload = {
            ...recipe,
            image: image.dataUrl
        }

        await axios
            .post(
                `http://localhost:3001/api/recipe`,
                payload,
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
            .then(() => {
                navigation('/');
            })
            .catch(err => {
                setError(err.response.data.error);
                setTimeout(() => { setError("") }, 2000)
                if (err.response.status === 401) {
                    localStorage.clear();
                    setTimeout(() => {
                        navigation('/')
                    }, 2000);
                }
            })
    };

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

    const addIcon = (type, index) => {
        return index === 0 && (
            <div style={{ paddingLeft: 6, display: 'inline-block' }}>
                <AppIconButton
                    className="secondary-button small-button"
                    icon={<AddIcon />}
                    onClick={() => dispatchRecipe({ type })} />
            </div>
        );
    }

    const removeIcon = (type, index) => {
        return index !== 0 && (
            <div style={{ paddingLeft: 6, display: 'inline-block' }}>
                <AppIconButton
                    className="secondary-button small-button"
                    icon={<RemoveIcon />}
                    onClick={() => dispatchRecipe({ type, index })} />
            </div>
        );
    }

    const imgElement = (image) => {
        if (!image.dataUrl) {
            return (
                <AppButton
                    style={{ width: 'auto' }}
                    className="secondary-button"
                    text="Upload image"
                    onClick={() => inputFile?.current?.click()} />
            );
        }
        return (
            <img src={image.dataUrl} alt="recipe" />
        );
    }

    return (
        <div style={{ padding: 12 }}>
            <form onSubmit={onSubmitHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <div
                            className={RecipeCss["recipe-image-div"]}>
                            <input
                                type='file'
                                id='file'
                                ref={inputFile}
                                style={{ display: 'none' }}
                                onChange={(e) => blobToBase64(e)} />
                            {imgElement(image)}
                        </div>
                    </Grid>

                    <Grid item xs={8}>
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
                                                onChange={(e) => dispatchRecipe({ type: 'UPDATE_INGREDIENT', index: index, ingredient: e.target.value })}
                                                label="Ingredient"
                                                size="small"
                                                className="login-input"
                                            />
                                            <div>
                                                {addIcon('ADD_INGREDIENT', index)}
                                                {removeIcon('DELETE_INGREDIENT', index)}
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
                                        onChange={(e) => dispatchRecipe({ type: 'UPDATE_STEPS', index: index, step: e.target.value })}
                                        label="Step"
                                        className="login-input"
                                        multiline
                                        style={{ width: '100%' }}
                                        maxRows={4}
                                    />
                                    {addIcon('ADD_STEP', index)}
                                    {removeIcon('DELETE_STEP', index)}
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
                </div>
            </form>

            <div>
                {error && <p>{error}</p>}
            </div>
        </div >
    );
}

export default AddEditRecipe;