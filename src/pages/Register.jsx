import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ApiService from "../services/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await ApiService.register(username, email, password);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/");
      }, 2000); 
    } catch (err) {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-400">
      <div className="bg-white shadow-2xl rounded p-8 w-80">
        <h2 className="text-3xl font-bold text-center py-5 text-gray-700">
          Register
        </h2>
        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}
        <form className="flex flex-col" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Register
          </button>
          <Link to="/" className="text-base text-center py-3 ">
            Sudah mempunyai akun?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
