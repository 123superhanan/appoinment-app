import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx"; // import your admin context
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppContextProvider>
          <AdminAuthProvider>
            {" "}
            {/* wrap here */}
            <App />
          </AdminAuthProvider>
        </AppContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
