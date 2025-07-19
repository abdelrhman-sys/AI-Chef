import React from "react";
import IngredientsList from "./components/IngredientsList";
import AIRecipe from "./components/AIRecipe";
import { getRecipeMarkdown } from "./ai";

export default function Main() {
    const [ingredients, setIngredients] = React.useState([]);
    const [recipe, setRecipe] = React.useState("");

    async function getRecipe() {
        const recipeMarkdown = await getRecipeMarkdown(ingredients);
        setRecipe(recipeMarkdown);
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    function resetIngredients() {
        setIngredients('');
        setRecipe('')
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
                />
            }

            {recipe && <AIRecipe recipe={recipe} />}
        </main>
    )
}