import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./routes/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import BurgerBuilder from "./components/BurgerBuilding/BurgerBuilder";
import BurgerBuilderStore from "./store/store";
import { Provider } from "react-redux";
import CheckOut from "./components/BurgerBuilding/CheckOut";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Registration from "./routes/Registration";
import MyOrder from "./components/BurgerBuilding/MyOrder";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/building-burger",
        element: <BurgerBuilder />,
      },
      {
        path: "/checkout",
        element: <CheckOut />,
      },
      {
        path: "/my-order",
        element: <MyOrder />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
  {
    path:"/login",
    element:<Login />,
  },
  {
    path:"/signup",
    element:<Registration />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={BurgerBuilderStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
