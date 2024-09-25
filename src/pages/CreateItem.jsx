import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../services/api";

const CreateItem = () => {
  const { id } = useParams();
  const [itemName, setItemName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiService.createChecklistItem(id, itemName);
      navigate(`/checklist/${id}`);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-400">
      <div className="bg-white shadow-lg rounded p-8 w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Create New Item</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateItem;
