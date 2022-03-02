import React, { useState, useContext } from "react";
import GetRecipes from "./GetRecipes";
import './FindRecipes.css'

const FindRecipes = () => {

    return (
        <div className="FindRecipes">

            <div className="FindRecipes-div">
                <h2>Recipe Search</h2>
                    <p className="FindRecipes-para">1) Enter ingredients one at a time</p>
                    <p className="FindRecipes-para">2) Optionally, add nutrient requirements</p>
                    <p className="FindRecipes-para">3) Click "Get Recipes"</p>
            </div>

            <GetRecipes />
            {/* <RecipeList /> */}
        </div>
    )
}

export default FindRecipes;