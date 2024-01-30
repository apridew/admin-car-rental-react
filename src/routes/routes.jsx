import DashboardPage from "../pages/DashboardPage";
import SignInPage from "../pages/SignInPage";
import CarsPage from "../pages/CarsPage";
import AddCarPage from "../pages/AddCarPage";
import EditCarPage from "../pages/EditCarPage";
import NotFound from "../pages/NotFound/index.";
import AuthRoute from "../hoc/AuthRoute";
import ProtectedRoute from "../hoc/ProtectedRoute";

export const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <AuthRoute>
        <SignInPage />
      </AuthRoute>
    ),
  },
  {
    path: "/cars",
    element: (
      <ProtectedRoute>
        <CarsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-car",
    element: (
      <ProtectedRoute>
        <AddCarPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit-car/:id",
    element: (
      <ProtectedRoute>
        <EditCarPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
