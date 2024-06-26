import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Import Service pages
import Services from "./ServiceTab/Services";
import StartFromScratch from "./ServiceTab/StartFromScratch";
import GetInspired from "./ServiceTab/GetInspired";
import GenerateCaptionForm from "./ServiceTab/GenerateCaptionForm";
import GenerateIdeasForm from "./ServiceTab/GenerateCaptionFromIdea";

// Import Profile pages
import Profile from "./ProfileTab/Profile";

// Import another pages
import Login from "./Login";
import NotFound from "./NotFound";

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/log-in" />} />

      {/* Login page */}
      <Route path="/log-in" element={<Login />} />

      {/* Services Tab */}
      <Route
        path="/services"
        element={<PrivateRoute element={<Services />} />}
      />
      <Route
        path="/services/start-from-scratch"
        element={<PrivateRoute element={<StartFromScratch />} />}
      />
      <Route
        path="/services/start-from-scratch/generate-caption"
        element={<PrivateRoute element={<GenerateCaptionForm />} />}
      />
      <Route
        path="/services/get-inspired"
        element={<PrivateRoute element={<GetInspired />} />}
      />
      <Route
        path="/services/get-inspired/generate-ideas"
        element={<PrivateRoute element={<GenerateIdeasForm />} />}
      />

      {/* Profile Tab */}
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />

      {/* Error pages */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
