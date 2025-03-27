import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsAdmin } from "../store/isAdminSlice";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("/api/admin/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        sessionStorage.setItem("token", data.token);
        dispatch(setIsAdmin(true));
        navigate("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("/api/admin/register", {
        username: signupUsername,
        password: signupPassword,
      });

      if (response.status === 201) {
        console.log("Signup successful", response.data.message);
        setShowSignup(false);
        setSignupUsername("");
        setSignupPassword("");
      } else {
        setError(response.data.message || "Signup failed");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  };
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      {!showSignup ? (
        <>
          <h2>User Login</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleLogin}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account?{" "}
            <button type="button" onClick={() => setShowSignup(true)}>
              Sign up
            </button>
          </p>
        </>
      ) : (
        <div>
          <h2>Sign Up</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSignup}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <button type="button" onClick={() => setShowSignup(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
