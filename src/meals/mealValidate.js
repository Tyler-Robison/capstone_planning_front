const mealValidate = values => {
    const errors = {};

    if (!values.calories) {
        errors.calories = 'Calories Required';
    }


    return errors;
};

export default mealValidate