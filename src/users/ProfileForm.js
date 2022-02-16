import React, { useContext, useEffect } from "react";
import UserAPI from "../APIs/userAPI";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import profileValidate from './user_validators/profileValidate'
import GlobalContext from "../context/GlobalContext";


const ProfileForm = () => {

    const { currentUser, setCurrentUser, token, setMsg } = useContext(GlobalContext)
    const validate = profileValidate
    const navigate = useNavigate();

    // crashes if visit while not logged in - this doesn't prevent
    useEffect(() => {
        if (!currentUser) navigate('/')
    }, [])

    let initialValues = {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: ''
    }

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: values => editProfile(values),
    })

    // can't change password or username right now
    // currentUser not updated on profile edit
    const editProfile = async (values) => {
        // update back-end, get new token based on updated backend
        try {
            const res = await UserAPI.editUser(currentUser.username, values, token)

            initialValues = formik.values
            initialValues.password = ''
            formik.resetForm({
                values: initialValues
            })
           
            setMsg('Profile Updated');
            setCurrentUser({...currentUser,  ...res.data.user})
        } catch (err) {
            setMsg('Invalid Profile Edit');
        }
    }


    return (
        <div>
            <h1>Profile Edit Form</h1>

            <div>
                <p><b>Username:</b> {currentUser.username}</p>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                        placeholder={currentUser.firstName}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                        <div>{formik.errors.firstName}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                        placeholder={currentUser.lastName}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                        <div>{formik.errors.lastName}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        name="email"
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        placeholder={currentUser.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div>{formik.errors.email}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="password">Confirm password to make changes:</label>
                    <input
                        id="password"
                        name="password"
                        type='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div>{formik.errors.password}</div>
                    )}
                </div>

                <button type="submit">Edit Profile</button>
            </form>
        </div>
    )
}


export default ProfileForm;