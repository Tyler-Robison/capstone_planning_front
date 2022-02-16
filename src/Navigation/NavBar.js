import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css'
import "bootstrap/dist/css/bootstrap.min.css"
import GlobalContext from "../context/GlobalContext";
import { Navbar, Container } from "react-bootstrap";

const NavBar = ({ logout }) => {
    const { currentUser } = useContext(GlobalContext)

    const loggedInView = <>

        <NavLink className="nav-link" to="/recipes">
            Recipes
        </NavLink>

        <NavLink className="nav-link" to="/meal">
            Meal Planning
        </NavLink>


        <NavLink className="nav-link" to="/users/profile">
            Profile
        </NavLink>

        {/* TODO: don't need logout if no currentUser */}
        {currentUser ?
            <button onClick={logout}> Log Out {currentUser.firstName}</button> :
            <button onClick={logout}> Log Out   </button>}

    </>

    const loggedOutView = <>

        <NavLink className="nav-link" to="/users/signup">
            Signup
        </NavLink>

        <NavLink className="nav-link" to="/users/login">
            Login
        </NavLink>

    </>

    // carrot icon next to healthy eater
    return (
        <Navbar className="NavBar" expand="lg">
            <Navbar.Brand className="NavBar-Brand" href="healthy-eater">Healthy-Eater</Navbar.Brand>
            <Container>


                {currentUser ? loggedInView : loggedOutView}

            </Container>
        </Navbar>
    )
}

export default NavBar;