import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { InvoiceProvider } from "./context/InvoiceContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import InvoiceForm from "./pages/InvoiceForm";
import InvoicePreview from "./pages/InvoicePreview";
import Settings from "./pages/Settings";
import Landing from './pages/Landing'

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <InvoiceProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoice/edit/:id"
            element={
              <ProtectedRoute>
                <InvoiceForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoice/new"
            element={
              <ProtectedRoute>
                <InvoiceForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoice/:id"
            element={
              <ProtectedRoute>
                <InvoicePreview />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </InvoiceProvider>
  );
}

export default App;
