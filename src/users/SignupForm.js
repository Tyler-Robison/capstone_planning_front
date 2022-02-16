import React, { useContext, useEffect } from "react";
import UserAPI from "../APIs/userAPI";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import signupValidate from "./user_validators/signupValidate";
import GlobalContext from "../context/GlobalContext";


const SignupForm = () => {
    const validate = signupValidate
    const navigate = useNavigate();
    const { currentUser, login, setMsg, clearMsg } = useContext(GlobalContext)

    useEffect(() => {
        if (currentUser) navigate('/')
    }, [])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: ''
        },
        validate,
        onSubmit: values => signup(values),
    })

    // login sets token, which triggers useEffect
    const signup = async (values) => {
        try {
            const res = await UserAPI.register(values)
            console.log('signup res', res)
            login(res.token);
            clearMsg();
            navigate('/');
        } catch (err) {
            console.log('signup error', err)
            setMsg('Invalid Username/Password');
        }
    }

    return (
        <div>
            <h1>SignupForm</h1>

            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        placeholder="Username"
                    />
                    {formik.touched.username && formik.errors.username && (
                        <div>{formik.errors.username}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder="Password"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div>{formik.errors.password}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                        placeholder="First Name"
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
                        placeholder="Last Name"
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
                        placeholder="E-mail"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div>{formik.errors.email}</div>
                    )}
                </div>
                <button type="submit">Sign-up</button>
            </form>
        </div>
    )
}

export default SignupForm;