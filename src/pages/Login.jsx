import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ApiService from "../services/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.login(username, password);
      const token = response.data.data.token;
      console.log("Received Token:", token); 
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-400">
      <div className="bg-white shadow-2xl rounded p-8 w-80">
        <h2 className="text-3xl font-bold text-center py-5 text-gray-700">
          Login
        </h2>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form className="flex flex-col" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          />
          <button
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            type="submit"
          >
            Login
          </button>
          <Link to="/register" className="text-base text-center py-3 ">
            Belum Memiliki Akun?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
