import React, { useState, useEffect } from "react";
import './App.css';
import UserAPI from "../APIs/userAPI";
import RouteList from './RouteList';
import NavBar from '../Navigation/NavBar';
import jwt from 'jsonwebtoken'
import useLocalStorage from "../customHooks/useLocalStorage";
import GlobalContext from "../context/GlobalContext";
import Message from "./Message";

function App() {

  const [token, setToken] = useLocalStorage('token')
  const [currentUser, setCurrentUser] = useState(null);
  const [msg, setMsg] = useState(null);

  // const displayMsg = message => setMsg(message);
  const clearMsg = () => setMsg(null);

  const logout = () => setToken(null);
  const login = token => setToken(token);

  useEffect(() => {
    const loginLogout = async () => {
      if (token && token.length !== 0) {
        const username = jwt.decode(token).username
        // res contains user detail
        console.log('useEffect', username)
        const res = await UserAPI.getUserInfo(username, token)
        console.log('use effect res', res)
        setCurrentUser(res);
      }
      else {
        setCurrentUser(null)
      }
    }
    loginLogout()
  }, [token])

  const providerObj = { 
    currentUser, 
    setCurrentUser,
    token,
    login,
    setMsg,
    clearMsg 
  }


  return (
    <div className="App">
      <GlobalContext.Provider value={providerObj}>
        <NavBar logout={logout} />
        {/* <h2>currentUser: {currentUser ? currentUser.username : 'Not logged in'}</h2>
        <h2>token: {token || 'Not logged in'}</h2> */}
        <Message msg={msg} />
        <RouteList />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
