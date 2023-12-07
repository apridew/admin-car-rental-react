import DashboardPage from '../pages/DashboardPage';
import SignInPage from '../pages/SignInPage';
import CarsPage from '../pages/CarsPage';
import AddCarPage from '../pages/AddCarPage';
import EditCarPage from '../pages/EditCarPage';
import NotFound from '../pages/NotFound/index.';

export const routes = [
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/cars',
    element: <CarsPage />,
  },
  {
    path: '/add-car',
    element: <AddCarPage />,
  },
  {
    path: '/edit-car/:id',
    element: <EditCarPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
