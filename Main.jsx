import React from "react";
import IngredientsList from "./components/IngredientsList";
import AIRecipe from "./components/AIRecipe";
import { getRecipeMarkdown } from "./ai";
import Loading from "./components/Loading";

export default function Main() {
    const [ingredients, setIngredients] = React.useState([]);
    const [recipe, setRecipe] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    async function getRecipe() {
        const recipeMarkdown = await getRecipeMarkdown(ingredients);
        setRecipe(recipeMarkdown);
        setLoading(false);
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    function resetIngredients() {
        setIngredients('');
        setRecipe('')
    }

    function showLoading() {
        setLoading(true);
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <p className="ingredient-warn">"cannot be less than 4 ingredients"</p>
                <input
                    type="text"
                    placeholder="e.g. oregano "
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    isRecipe={recipe}
                    resetIngredients={resetIngredients}
                    showLoading={showLoading}
                />
            }
            <Loading loading={loading} />
            {recipe && <AIRecipe recipe={recipe} />}
        </main>
    )
}