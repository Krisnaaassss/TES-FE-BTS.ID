import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ApiService from "../services/api";

const ChecklistDetail = () => {
  const { id } = useParams();
  const [checklist, setChecklist] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchChecklistDetails = useCallback(async () => {
    try {
      const response = await ApiService.getAllChecklists();

      if (response.data && response.data.data) {
        const foundChecklist = response.data.data.find(
          (item) => item.id === parseInt(id)
        );

        if (foundChecklist) {
          setChecklist(foundChecklist);
          setItems(foundChecklist.items || []);
        } else {
          throw new Error("Checklist not found.");
        }
      } else {
        throw new Error("Unexpected response format from the server.");
      }
    } catch (err) {
      console.error("Error fetching checklist details:", err);
      setError("Failed to load checklist details.");
    }
  }, [id]);

  useEffect(() => {
    fetchChecklistDetails();
  }, [fetchChecklistDetails]);

  const handleDeleteItem = async (itemId) => {
    try {
      await ApiService.deleteChecklistItem(id, itemId);
      fetchChecklistDetails();
    } catch (err) {
      console.error("Error deleting item:", err);
      setError("Failed to delete item.");
    }
  };

  const handleToggleItem = async (itemId) => {
    try {
      await ApiService.updateChecklistItemStatus(id, itemId);
      fetchChecklistDetails();
    } catch (err) {
      console.error("Error toggling item:", err);
      setError("Failed to toggle item status.");
    }
  };

  const handleDeleteChecklist = async () => {
    try {
      await ApiService.deleteChecklist(id);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error deleting checklist:", err);
      setError("Failed to delete checklist.");
    }
  };

  if (!checklist)
    return (
      <div className="text-center text-lg font-bold text-gray-700 h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="h-screen flex flex-col items-center bg-gray-200 p-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-4">
          {checklist.name}
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <div className="mb-4 flex justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
          >
            Kembali ke Dashboard
          </button>
        </div>
        <div className="flex justify-between mb-4">
          <Link
            to={`/checklist/${id}/create-item`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Add New Item
          </Link>
          <button
            onClick={handleDeleteChecklist}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Delete Checklist
          </button>
        </div>

        {items.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li
                key={item.id}
                className="py-4 flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={item.itemCompletionStatus}
                    onChange={() => handleToggleItem(item.id)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center mt-4">No items available.</p>
        )}
      </div>
    </div>
  );
};

export default ChecklistDetail;
