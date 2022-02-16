import React, { useEffect } from "react";
import { useFormik } from "formik";
import './AddIngredientForm.css'

const AddIngredientForm = ({ ingredientsList, setIngredientsList }) => {


    const formik = useFormik({
        initialValues: {
            ingredient: ''
        },
        onSubmit: values => addIngredient(values),
    })

    const addIngredient = (values) => {
        const { ingredient } = values
        setIngredientsList([...ingredientsList, ingredient])
    }


    return (
        <form className="AddIngredient-Form" onSubmit={formik.handleSubmit}>

            <label htmlFor="ingredient">Ingredient</label>
            <input
                id="ingredient"
                name="ingredient"
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ingredient}
            />
            <button type="submit">Add ingredient</button>
        </form>
    )
}

export default AddIngredientForm;