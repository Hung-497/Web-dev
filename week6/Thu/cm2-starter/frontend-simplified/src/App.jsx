import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from "react";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.token ? true : false;
  });
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}/>}>
        <Route index element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage />} />
        <Route path="/edit-job/:id" element={<EditJobPage />} />
        <Route path="/jobs/:id" element={<JobPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={!isAuthenticated ? (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/" />
                )} />
        <Route path="/signup" element={!isAuthenticated ? (
                  <Signup setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/" />
                )} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
