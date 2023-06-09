import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import Login from './pages/Login';
import Overview from './pages/Overview';
function App() {
  const navigate = useNavigate();
  const [post, setPost] = useState<any>();
  const [loginStatus, setLoginStatus] = useState<any>(false)
  const [userName, setUserName] = useState<any>();
  const getLoginCreds = (userName: any, mail: any, password: any) => {
    if (userName && mail && password) {
      setUserName(userName)
      const baseURL = `http://0.0.0.0:9001/signup?username=${userName}&email=${mail}&password=${password}`
      axios
        .post(baseURL, {
          title: "Hello World!",
          body: "This is a new post."
        })
        .then((response) => {
          setPost(response.data);
        });



      navigate("/overview");
    }
  }
  return (
    <>
      <Routes>
        <Route path='/' element={<Login pushLoginCreds={getLoginCreds} />} ></Route>
        <Route path='/overview' element={<Overview userName={userName} />}></Route>
      </Routes>

    </>
  );
}

export default App;
