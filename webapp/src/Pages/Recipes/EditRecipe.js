import { useParams } from "react-router-dom";
import RecipeForm from "../../Components/Recipe/RecipeForm";


const EditRecipe = () => {
    const { id } = useParams();

    return <RecipeForm id={id} />;
}

export default EditRecipe;