import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import Login from './pages/Login';
import Overview from './pages/Overview';
import { JoinChallengePage } from './pages/JoinChallengePage';
import { NavBar } from './components/NavBar';
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
        .then((response: any) => {
          setPost(response.data);
        });



      navigate("/overview");
    }
  }
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Login pushLoginCreds={getLoginCreds} />} ></Route>
        <Route path='/overview' element={<Overview userName={userName} />}></Route>
        {/* <Route path='/join' element={<JoinChallengePage info={undefined}></JoinChallengePage>}></Route> */}

      </Routes>

    </>
  );
}

export default App;
