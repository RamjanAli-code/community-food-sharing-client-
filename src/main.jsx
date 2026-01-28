import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home/Home.jsx'
import AllFood from './AllFood/AllFood.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './layout/Root.jsx'
import AuthProvider from './AuthProvider/AuthProvider.jsx'
import Login from './Login/Login.jsx';
import Profile from './Profile/Profile.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx'
import AvailableFood from './AvailableFood/AvailableFood.jsx'
import AddFoot from './AddFoot/AddFoot.jsx'
import ManageFood from './ManageFood/ManageFood.jsx'
import FoodRequest from './FoodRequest/FoodRequest.jsx'
import FoodDetails from './FoodDetails/FoodDetails.jsx'
import UpdateFood from './UpdateFood/UpdateFood.jsx'
import DeleteFood from './DeleteFood/DeleteFood.jsx'
import Error from './Error/Error.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement:<Error></Error>,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement:<Error></Error>,
      },
      {
        path: "allFood",
        element: <AllFood />,
        errorElement:<Error></Error>,
      },
      {
        path: "Login",
        element: <Login />,
        errorElement:<Error></Error>,
      },
      // {
      //   path:'ForgotPassword',
      //   element:<ForgotPassword/>,
      // },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
        errorElement:<Error></Error>,
      },
      {
        path: "availableFood",
        element:
          <AvailableFood />,
        errorElement:<Error></Error>,
      },
      {
        path: "addFood",
        element: (
          <PrivateRoute>
            <AddFoot />
          </PrivateRoute>
        ),
        errorElement:<Error></Error>,
      },
      {
        path: "manageFood",
        element: (
          <PrivateRoute>
            <ManageFood />
          </PrivateRoute>
        ),
        errorElement:<Error></Error>,
      },
      {
        path: "foodRequest",
        element: (
          <PrivateRoute>
            <FoodRequest />
          </PrivateRoute>
        ),
        errorElement:<Error></Error>,
      },
      {
        path: "food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
        errorElement:<Error></Error>,
      },
      {
        path: "update-food/:id",
        element: (
          <PrivateRoute>
            <UpdateFood />
          </PrivateRoute>
        ),
        errorElement:<Error></Error>,
      },
      {
        path: "delete-food/:id",
        element: (
          <PrivateRoute>
            <DeleteFood />
          </PrivateRoute>
        ),
        errorElement:<Error></Error>,
      },

    ],
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      {/* <ToastContainer position="top-center" autoClose={2000} /> */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
