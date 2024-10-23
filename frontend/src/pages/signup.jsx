{
  /* This is the signup page. */
}
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Button from "../components/button.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send user data to the server
      await axios.post("http://localhost:5001/api/users/register", {
        uid: user.uid, // Firebase UID
        email: user.email,
        displayName: displayName, 
      });

      // Navigate to login after successful registration
      alert("Account created successfully! Please log in.");
      navigate("/login");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
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
          <form onSubmit={onSubmit}>
            {/* Input display name */}
            <div className="mb-4">
              <label htmlFor="display-name" className="sr-only">
                Display Name
              </label>
              <input
                id="display-name"
                name="displayName"
                type="text"
                value={displayName}
                required
                className="w-full p-3 rounded border border-gray-300 text-customLightGray font-bold"
                placeholder="Display Name"
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            {/* Input email address */}
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
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
                type="submit" // Change to type="submit"
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
