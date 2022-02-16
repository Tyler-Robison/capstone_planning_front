import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import SearchByIngred from '../Forms/SearchByIngred'
import useLocalStorage from "../customHooks/useLocalStorage";
import './FindRecipes.css'

const FindRecipes = () => {
    const [recipes, setRecipes, clearRecipes] = useLocalStorage('recipes')
    const navigate = useNavigate();
  



    return (
        <div>
            <div className="FindRecipes-Detail">

            </div>
            <h2>Recipes</h2>
            <button onClick={clearRecipes}>Clear Recipes</button>
            <ol>
                {recipes.map(recipe => {
                    return <li key={recipe.id}>
                        <p><b>Title:</b> {recipe.title}</p>
                        <button onClick={(() => navigate(`/${recipe.id}/detail`))}>See Full Recipe</button>
                        <p>Uses {recipe.usedIngredients.length} of your ingredients</p>
                        <img src={recipe.image} alt={`Picture of the recipe ${recipe.title}`}></img>
                    </li>
                })}
            </ol>

            {/* add button allowing you to search by ingreds or other categories */}
            <SearchByIngred setRecipes={setRecipes} />
        </div>
    )
}

export default FindRecipes;