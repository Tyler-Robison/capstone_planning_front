import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SpoonacularAPI from '../APIs/spoonAPI'
import NutrientTable from './NutrientTable';
import StepsList from './StepsList';
import './RecipeDetail.css'

const RecipeDetail = () => {
    const { recipeID } = useParams()
    const navigate = useNavigate();
    const [recipeDetail, setRecipeDetail] = useState(null)
    const [nutritionDetail, setNutritionDetail] = useState(null)
    const goBack = () => navigate('/');


    useEffect(() => {
        const getRecipeDetail = async () => {
            const res = await SpoonacularAPI.getRecipeDetail(recipeID);
            console.log('getRecipeDetail', res)
            // alternates between working and not working without changing any code
            // was setting recipeDetail but not nutritionDetail
            // when it fails, arbitrarily flipping order of these two fixes it
            setNutritionDetail(res.nutrition)
            setRecipeDetail(res.recipe)


            // Whenever it fails, this doesn't print
            console.log('test')
        }
        getRecipeDetail();
    }, [])

    console.log('recipe detail', recipeDetail)
    console.log('nutri detail', nutritionDetail)

    const displayNutrition = () => {
        return <div>
            <h5>Unhealthy Ingredients</h5>
            <NutrientTable nutritionDetail={nutritionDetail.bad} />
            <h5>Healthy Ingredients</h5>
            <NutrientTable nutritionDetail={nutritionDetail.good} />
        </div>
    }

    // removed ( ) around loading, make sure doesn't break
    if (!recipeDetail) return <p>Loading...</p>

    return (
        <div>
            <h1>{recipeDetail.title}</h1>

            {/* <h2>Summary: {recipeDetail.summary}</h2> */}
            <h3>Preparation Time: {recipeDetail.readyInMinutes} Minutes</h3>
            <h3>Serves: {recipeDetail.servings}</h3>
            <div className='steps-container'>
                <StepsList recipeDetail={recipeDetail} />
            </div>
            <div className='nutrition-div'>{displayNutrition()}</div>
            <button className='go-back-btn' onClick={goBack}>Back</button>

        </div>
    )

}

export default RecipeDetail;