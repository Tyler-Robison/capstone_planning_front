import React, { useState, useEffect, useContext } from "react";
import SpoonacularAPI from "../APIs/spoonAPI";
import { useFormik } from "formik";
import mealValidate from "./mealValidate";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import MealList from "./MealList";

const Meal = () => {
    const [mealData, setMealData] = useState(null);
    const [calories, setcalories] = useState(2000);
    const { currentUser } = useContext(GlobalContext)
    const navigate = useNavigate()
    const validate = mealValidate

    useEffect(() => {
        if (!currentUser) navigate('/')
    }, [])

    const formik = useFormik({
        initialValues: {
            calories: ''
        },
        validate,
        onSubmit: values => getMeal(values),
    })

    const getMeal = async (values) => {
        try {
            const { calories } = values
            const res = await SpoonacularAPI.getMealPlan(calories)
            setMealData(res)
            console.log('get meal plan res', res)
        } catch (err) {
            console.log('error', err)
        }
    }


    return (
        <div>
            <h2>Meal Planning</h2>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="calories">Calories</label>
                <input
                    id='calories'
                    type='number'
                    name="calories"
                    placeholder="calories (example: 2000)"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.calories}
                />
                <button type="submit">Get Meal Plan</button>
                {formik.touched.calories && formik.errors.calories && (
                    <div>{formik.errors.calories}</div>
                )}
            </form>
            {mealData && <MealList mealData={mealData} />}

        </div>
    )
}

export default Meal;