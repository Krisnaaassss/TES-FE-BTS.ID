// src/components/CreateChecklist.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/api";

const CreateChecklist = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.createChecklist(name);
      console.log("Checklist created:", response);
      navigate("/dashboard", { state: { newChecklist: response.data } });
    } catch (error) {
      console.error("Error creating checklist:", error.response);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-400">
      <div className="bg-white shadow-lg rounded p-8 w-80">
        <h2 className="text-2xl font-bold text-center mb-4">
          Create New Checklist
        </h2>
        {error && (
          <p className="text-red-600 text-center mb-4 font-semibold">{error}</p>
        )}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Checklist Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Create Checklist
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChecklist;
