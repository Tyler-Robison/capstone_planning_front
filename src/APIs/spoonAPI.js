import axios from "axios";

const BASE_URL = "http://localhost:3001";

// contains all API calls related to spoontacular endpoints. 

class SpoonacularAPI {

    static token;

    // static async request(endpoint, data = {}, method = 'get') {


    //     const url = `${BASE_URL}/${endpoint}`;
    //     const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    //     const params = (method === "get")
    //         ? data
    //         : {};
    // }

    // ingredientsList is an array of strings ['ham', 'cheese']
    static async getRecipesByIngredient(ingredientsList) {
        console.log('ingredList', ingredientsList)
        try {
            const params = {
                ingredients: ingredientsList
            }
            console.log('API incoming', params)

            const res = await axios.get(`${BASE_URL}/recipe/ingredient`, { params })
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

            const res = await axios.get(`${BASE_URL}/recipe/detail`, { params })
            console.log('********')
            console.log('recipe detail res', res)
            return res.data
        }
        catch (err) {
            console.log(err)
        }
    }

    static async getMealPlan(calories) {
        console.log('cals', calories)
        try {

            const params = {
                calories: calories
            }

            const res = await axios.get(`${BASE_URL}/meals`, { params })
            return res.data
            console.log('meal API res', res)
        } catch (err) {
            console.log('get meal plan API err', err)
        }
    }
}

export default SpoonacularAPI;