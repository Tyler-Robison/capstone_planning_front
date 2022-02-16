import React, { useState } from "react";
import SpoonacularAPI from "../APIs/spoonAPI";
import AddIngredientForm from "./AddIngredientForm";
import useLocalStorage from "../customHooks/useLocalStorage";
import './SearchByIngred.css'

const RecipeByIngredForm = ({ setRecipes }) => {
    const [ingredientsList, setIngredientsList, clearIngredients] = useLocalStorage('ingredients')

    const removeIngredient = (ingredient) => {
        const filteredList = ingredientsList.filter(i => i !== ingredient);
        setIngredientsList(filteredList);
    }


    const getRecipes = async () => {
        const res = await SpoonacularAPI.getRecipesByIngredient(ingredientsList)
        console.log('react res', res)
        setRecipes(res);
    }

    return (
        <div>
            <h3>Recipe Ingredients</h3>
            <button onClick={clearIngredients}>Clear List</button>
            {/* after refrshing list is recipe objs not ingreds */}
            {/* {console.log('ingred list', ingredientsList)} */}
            <ol>
                {ingredientsList.map((ingredient, idx) => {
                    return <li key={idx}>
                        {ingredient}
                        <button onClick={() => removeIngredient(ingredient)}>X</button>
                    </li>
                })}
            </ol>


            <button onClick={getRecipes}>Get Recipes</button>


            <AddIngredientForm ingredientsList={ingredientsList} setIngredientsList={setIngredientsList} />
        </div>
    )
}

export default RecipeByIngredForm;