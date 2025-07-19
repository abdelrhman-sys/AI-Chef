export default function IngredientsList(props) {
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))
    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {props.ingredients && <button onClick={props.resetIngredients} className="reset-btn">Reset ingredients</button>}
            {props.ingredients.length > 3 && <div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe} style={{backgroundColor: props.isRecipe&& "green"}}>{props.isRecipe? "Get a different recipe" : "Get a recipe"}</button>
            </div>}
        </section>
    )
}