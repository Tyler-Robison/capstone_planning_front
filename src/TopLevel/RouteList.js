import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import FindRecipes from "../Recipes/FindRecipes";
import RecipeDetail from "../Recipes/RecipeDetail";
import Meal from "../meals/Meal";
// import Home from "../Home/Home";

import ProfileForm from "../users/ProfileForm";
import LoginForm from "../users/LoginForm";
import SignupForm from "../users/SignupForm";
// import RequireAuth from "./RequireAuth";

const RouteList = () => {


    return (
        <Routes>
            <Route path="/healthy-eater" element={<FindRecipes />} />
            <Route path="/:recipeID/detail" element={<RecipeDetail />} />
            <Route path="/meal" element={<Meal />} />

            {/* user routes */}
            <Route path="/users/signup" element={<SignupForm />} />
            <Route path="/users/login" element={<LoginForm />} />
            <Route path="/users/profile" element={<ProfileForm />} />

            <Route path="/" element={<Navigate replace to="/healthy-eater" />} />
            <Route path='*' element={<Navigate replace to="/healthy-eater" />} />
        </Routes>
    )
}

export default RouteList;