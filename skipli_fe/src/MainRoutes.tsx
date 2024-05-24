import { Routes, Route, Navigate } from "react-router-dom";

// Import Service pages
import Services from "./routes/ServiceTab/Services";
import StartFromScratch from "./routes/ServiceTab/StartFromScratch";
import GetInspired from "./routes/ServiceTab/GetInspired";

// Import Profile pages
import Profile from "./routes/ProfileTab/Profile";

// Import another pages
import Login from "./routes/Login/Login";
import NotFound from "./routes/NotFound";

function MainRoutes() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/log-in" />} />

      {/* Login page */}
      <Route path="/log-in" element={<Login />} />

      {/* Services Tab */}
      <Route path="/services" element={<Services />} />
      <Route
        path="/services/start-from-scratch"
        element={<StartFromScratch />}
      />
      <Route path="/services/get-inspired" element={<GetInspired />} />

      {/* Profile Tab */}
      <Route path="/profile" element={<Profile />} />

      {/* Error pages */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default MainRoutes;
