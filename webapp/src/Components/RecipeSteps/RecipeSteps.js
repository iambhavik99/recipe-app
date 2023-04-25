import './RecipeSteps.css';

export const RecipeSteps = (props) => {
    return (
        <div className='recipe-step-page'>
            <div className='recipe-how-to-make'>How to make?</div>
            {
                props.steps?.map((step, index) => {
                    return (
                        <li key={index} className='step-steps'>
                            <span>{step}</span>
                        </li>

                    )
                })
            }
        </div>
    )
}