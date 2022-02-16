import React from "react";

const MealList = ({ mealData }) => {
    const { meals, nutrients } = mealData

    return (
        <div>
            <ol>
                {meals.map(meal => {
                    return <li>
                        <p>{meal.title}</p>
                    </li>
                })}
            </ol>
        </div>
    )
}

export default MealList;