import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ApiService from "../services/api"; 
const ChecklistDetail = () => {
  const { id } = useParams();
  const [checklist, setChecklist] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  // Fetch checklist details and items from the API
  const fetchChecklistDetails = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const checklistResponse = await ApiService.getChecklistItem(id);
      setChecklist(checklistResponse.data);

      const itemsResponse = await ApiService.getChecklistItems(id);
      setItems(itemsResponse.data);
    } catch (err) {
      setError("Failed to load checklist details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchChecklistDetails();
  }, [fetchChecklistDetails]);

  const handleDeleteChecklist = async () => {
    try {
      await ApiService.deleteChecklist(id);
      navigate("/dashboard"); 
    } catch (err) {
      setError("Failed to delete checklist.");
    }
  };

  const handleToggleItem = async (itemId) => {
    try {
      await ApiService.updateChecklistItemStatus(id, itemId);
      fetchChecklistDetails(); 
    } catch (err) {
      setError("Failed to update item status.");
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await ApiService.deleteChecklistItem(id, itemId);
      fetchChecklistDetails();
    } catch (err) {
      setError("Failed to delete item.");
    }
  };

  if (loading)
    return <div className="text-center text-gray-700">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="h-screen flex flex-col items-center bg-gray-200 p-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-4">
          {checklist.name}
        </h2>
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
        <ul className="divide-y divide-gray-200">
          {items.map((item) => (
            <li
              key={item.id}
              className="py-4 flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleToggleItem(item.id)}
                  className="w-5 h-5 text-blue-600"
                />
                <Link
                  to={`/checklist/${id}/item/${item.id}`}
                  className="text-gray-700 hover:underline"
                >
                  {item.name}
                </Link>
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
      </div>
    </div>
  );
};

export default ChecklistDetail;
