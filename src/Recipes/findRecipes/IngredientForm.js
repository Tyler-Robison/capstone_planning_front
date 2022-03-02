import React, { useContext } from "react";
import { useFormik } from "formik";

import './IngredientForm.css'


const IngredientForm = ({ ingredientsList, setIngredientsList }) => {


    const formik = useFormik({
        initialValues: {
            ingredient: ''
        },
        onSubmit: values => addIngredient(values),
    })

    const addIngredient = (values) => {
        const { ingredient } = values;
        if (ingredient === '') return
        formik.resetForm();
        setIngredientsList([...ingredientsList, ingredient]);
    }


    return (
        <form className="AddIngredient-Form" onSubmit={formik.handleSubmit}>

            {/* <label className="IngredientForm-label" htmlFor="ingredient">Ingredient</label> */}
            {/* <div> */}
                <input
                    className="test-input"
                    id="ingredient"
                    name="ingredient"
                    type='text'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ingredient}
                />
            {/* </div> */}
            <button className="general-btn" type="submit">Add ingredient</button>
        </form>
    )
}

export default IngredientForm;