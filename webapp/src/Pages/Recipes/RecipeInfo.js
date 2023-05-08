import { useParams } from "react-router-dom";
import { RecipeDetails } from "../../Components/Recipe/RecipeDetails";

const RecipeInfo = () => {

    const { id } = useParams();

    return (
        <RecipeDetails id={id} />
    )

}


export default RecipeInfo;