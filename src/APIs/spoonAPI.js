import axios from "axios";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// contains all API calls related to spoontacular endpoints. 

class SpoonacularAPI {

    // static async getRecipesByIngredient(ingredientsList) {
    //     console.log('ingredList', ingredientsList)
    //     try {
    //         const params = {
    //             ingredients: ingredientsList
    //         }
    //         console.log('API incoming', params)

    //         const res = await axios.get(`${BASE_URL}/recipes/ingredient`, { params })
    //         console.log('API res', res)
    //         return res.data
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // ingredientsList is an array of strings ['ham', 'cheese']
    static async getRecipes(ingredientsList, nutrientObj) {
        console.log('ingredList', ingredientsList)
        try {
            const params = {
                ingredients: ingredientsList,
                nutrientObj
            }
            console.log('API incoming', params)

            const res = await axios.get(`${BASE_URL}/recipes/complex`, { params })
            console.log('API res', res)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }


    static async getRecipeDetail(recipeId) {
        console.log('recipdeId', recipeId)
        try {
            const params = {
                recipeId: recipeId
            }
            console.log('API incoming', params)

            const res = await axios.get(`${BASE_URL}/recipes/detail`, { params })
            console.log('********')
            console.log('recipe detail res', res)
            return res.data
        }
        catch (err) {
            console.log(err)
        }
    }
}

export default SpoonacularAPI;