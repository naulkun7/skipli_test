import React from "react";
import Sidebar from "./components/theme/Sidebar";
import MainRoutes from "./routes/MainRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Sidebar>
        <MainRoutes />
      </Sidebar>
    </AuthProvider>
  );
}

export default App;
