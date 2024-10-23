{ /* This is the signup page. */ }
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Button from "../components/button.jsx";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <main className="bg-customCream h-screen flex items-center justify-center">
      {/* Logo in the top left corner with link back to homepage */}
      <Link
        to="/"
        className="text-customBlue text-4xl font-bold font-inknut absolute top-4 left-6"
      >
        SKINrecs
      </Link>
      <div className="w-full max-w-md">
        {/* Sign up prompt */}
        <div className="bg-customBlue shadow-lg rounded-lg p-8">
          <h2 className="text-center text-customCream text-3xl font-bold mb-6 font-inknut">
            Sign Up
          </h2>
          <form>
            {/* Input email address */}
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                label="Email address"
                value={email}
                required
                className="w-full p-3 rounded border border-gray-300 text-customLightGray font-bold"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Input password */}
            <div className="mb-6">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                label="Create password"
                value={password}
                required
                className="w-full p-3 rounded border border-gray-300 text-customLightGray font-bold"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Button to sign up */}
            <div className="mb-4 text-center">
              <Button
                label="Sign up"
                color="#F6CACB"
                activeColor="#DF9D9D"
                onClick={onSubmit}
              />
            </div>
          </form>
        </div>
        {/* Link to login page */}
        <p className="text-center text-customLightGray mt-4">
          Already have an account?{" "}
          <NavLink to="/login" className="text-customBlue hover:underline">
            Sign in
          </NavLink>
        </p>
      </div>
    </main>
  );
};

export default Signup;
