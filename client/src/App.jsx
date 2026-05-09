import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SubmitTicketPage from "./pages/SubmitTicketPage";

import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminRoute from "./components/AdminRoute";
import TicketDetailsPage from "./pages/TicketDetailsPage";
import GoogleSuccessPage from "./pages/GoogleSuccessPage";
function SettingsPage() {
  return (
    <div className="p-6 text-slate-600">Settings page coming soon.</div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
      <Route path="/google-success" element={<GoogleSuccessPage />} />

      <Route
        path="/"
        element={
          <AdminRoute>
            <DashboardPage />
          </AdminRoute>
        }
      />
      <Route
  path="/tickets/:id"
  element={
    <AdminRoute>
      <TicketDetailsPage />
    </AdminRoute>
  }
/>
      <Route
        path="/submit-ticket"
        element={
          <ProtectedRoute>
            <SubmitTicketPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <AdminRoute>
            <SettingsPage />
          </AdminRoute>
        }
      />
    </Routes>
  );
}