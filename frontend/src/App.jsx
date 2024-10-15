import "../index.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Quiz from './pages/quiz';
import Products from './pages/products';
import Error from './pages/error';
import Signup from './pages/signup';
import Login from './pages/login';
import Logout from './pages/logout';
import UserInfo from "./pages/userInfo";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            {/* This is the routing for our pages such as the home, quiz, and products page. */}
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/products" element={<Products />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/userInfo" element={<UserInfo />} />
            {/* Error if page not found */}
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

