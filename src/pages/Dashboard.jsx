import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../services/api.js";

const Dashboard = () => {
  const [checklists, setChecklists] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchChecklists();
  }, []);

  const fetchChecklists = async () => {
    try {
      const response = await ApiService.getAllChecklists();
      console.log("Fetched Checklists Response:", response);
      console.log("Fetched Checklists Data:", response.data.data);

      if (response.data && response.data.data) {
        setChecklists(response.data.data);
        setError("Unexpected response format from the server.");
      }
    } catch (err) {
      console.error("Error fetching checklists:", err);
      setError(
        "Failed to fetch checklists. Please check your network and try again."
      );
    }
  };

  return (
    <div className="bg-gray-400 h-screen">
      <div className="flex flex-col items-center bg-gray-400 pt-24">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-24">
          RECRUITMENT TEST Guide Frontend Coding Test
        </h2>
        <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-3xl">
          {error && (
            <p className="text-red-600 text-center mb-4 font-semibold">
              {error}
            </p>
          )}
          <Link
            to="/create-checklist"
            className="bg-blue-600 text-white px-4 py-2 rounded-md mb-6 hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          >
            Create New Checklist
          </Link>
          {checklists.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {checklists.map((checklist) => (
                <li
                  key={checklist.id}
                  className="py-4 flex justify-between items-center"
                >
                  <span className="text-gray-700 font-medium">
                    {checklist.name}
                  </span>
                  <Link
                    to={`/checklist/${checklist.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center">
              No checklists available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
