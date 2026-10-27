import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./routes/MainLayout";
import Employee from "./components/Employee";
import EmployeeForm from "./components/EmployeeFrom";
import AppNavbar from "./ui/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Employee />,
      },
      {
        path: "add",
        element: <EmployeeForm />,
      },
      {
        path: "update/:id",
        element: <EmployeeForm />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
