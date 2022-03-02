import React, { useContext, useState } from "react";
import SpoonacularAPI from "../../APIs/spoonAPI";
import IngredientForm from "./IngredientForm";
import NutrientForm from "./NutrientForm";
import IngredientList from "./IngredientList";
// import useLocalStorage from "../../customHooks/useLocalStorage";
import Message from "../../TopLevel/Message";
import GlobalContext from "../../context/GlobalContext";
import './GetRecipes.css'
import { useNavigate } from "react-router-dom";

const GetRecipes = () => {
    const { setRecipes, setMsg, msg } = useContext(GlobalContext)
    // remove ingredients from local storage.
    // const [ingredientsList, setIngredientsList, clearIngredients] = useLocalStorage(`ingredients_${currentUser.id}`)

    const navigate = useNavigate();
    const [ingredientsList, setIngredientsList] = useState([])


    const [fat, setFat] = useState(null)
    const [satFat, setSatFat] = useState(null)
    const [calories, setCalories] = useState(null)
    const [carbs, setCarbs] = useState(null)
    const [sugar, setSugar] = useState(null)
    const [sodium, setSodium] = useState(null)
    const [cholesterol, setCholesterol] = useState(null)
    const [protein, setProtein] = useState(null)

    // contains min/max values all recipes must fall within
    const nutrientObj = {
        maxFat: fat,
        maxSaturatedFat: satFat,
        maxCalories: calories,
        maxCarbs: carbs,
        maxCholesterol: cholesterol,
        maxSugar: sugar,
        maxSodium: sodium,
        maxProtein: protein
    }

    const getRecipesFunc = async () => {
        console.log('test')
        const res = await SpoonacularAPI.getRecipes(ingredientsList, nutrientObj)
        console.log('react res', res)
        if (res.results.length === 0) {
            setMsg('Recipe search failed. Try removing ingredients. If you have nutritional constraints, try relaxing them.')
            return
        } else {
            setMsg('')
        }
        setRecipes(res.results);
        navigate('/recipes');
    }

    return (
        <div className="container-div">
            <div className="recipe-div">
                <div className="ingredient-div">
                    {/* both keys can be id not index */}
                
                    <div className="GetRecipes-IngForm-container">
                        <h3 className="GetRecipes-header">Ingredients</h3>
                        <Message msg={msg} />
                        <IngredientForm ingredientsList={ingredientsList} setIngredientsList={setIngredientsList} />
                        <IngredientList ingredientsList={ingredientsList} setIngredientsList={setIngredientsList} />
                        <button className="general-btn GetRecipes-btn" onClick={getRecipesFunc}>Get Recipes</button>
                    </div>
                </div>
                <div className="nutrient-div">
                    <div className="NutrientForm-container">
                        <h3 className="GetRecipes-header">Nutrients</h3>
                        {/* <button onClick={resetNutrients}>Clear List</button> */}

                        {/* for de-bugging purposes */}
                        {/* <div className="nutrient-para-container">
                            <p className="nutrient-para">Fat: {fat}</p>
                            <p className="nutrient-para">Saturated Fat: {satFat}</p>
                            <p className="nutrient-para">Carbs: {carbs}</p>
                            <p className="nutrient-para">Calories: {calories}</p>
                            <p className="nutrient-para">Cholesterol: {cholesterol}</p>
                            <p className="nutrient-para">Sugar: {sugar}</p>
                            <p className="nutrient-para">Sodium: {sodium}</p>
                            <p className="nutrient-para">Protein: {protein}</p>
                        </div> */}

                        <NutrientForm
                            setFat={setFat}
                            setSatFat={setSatFat}
                            setSugar={setSugar}
                            setSodium={setSodium}
                            setCholesterol={setCholesterol}
                            setCalories={setCalories}
                            setCarbs={setCarbs}
                            setProtein={setProtein}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetRecipes;