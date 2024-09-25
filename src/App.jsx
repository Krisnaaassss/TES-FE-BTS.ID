import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateItem from "./pages/CreateItem";
import ItemDetail from "./pages/ItemDetail";
import ChecklistDetail from "./pages/ChecklistDetail";
import CreateChecklist from "./pages/CreateChecklist";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-checklist" element={<CreateChecklist />} />
        <Route path="/checklist/:id" element={<ChecklistDetail />} />
        <Route path="/checklist/:id/create-item" element={<CreateItem />} />
        <Route
          path="/checklist/:checklistId/item/:itemId"
          element={<ItemDetail />}
        />
        <Route path="*" element={<Navigate to="/" />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
