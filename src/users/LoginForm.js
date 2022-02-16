import React, { useContext, useEffect } from "react";
import UserAPI from "../APIs/userAPI";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import loginValidate from './user_validators/loginValidate'
import GlobalContext from "../context/GlobalContext";


const LoginForm = () => {
    const validate = loginValidate
    const navigate = useNavigate();
    const { currentUser, login, setMsg, clearMsg } = useContext(GlobalContext)

    useEffect(() => {
        if (currentUser) navigate('/')
    }, [])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate,
        onSubmit: values => loginUser(values),
    })

    const loginUser = async (values) => {
        try {
            const res = await UserAPI.login(values)
            console.log('login res', res)
            // res is a token value
            login(res.token);
            // clearMsg()
            navigate('/')
        } catch (err) {
            console.log('error', err)
            // displayMsg('Invalid Username/Password')
        }
    }

    return (
        <div>
            <h1>Login Form</h1>

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
                <button data-testid="login-btn" type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm;