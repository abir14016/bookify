import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import App from "../App";
import SignIn from "../pages/SignIn";
import BookDetail from "../pages/BookDetail";
import AllBooks from "../pages/AllBooks";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/books/:id",
        element: <BookDetail />,
      },
      {
        path: "/books",
        element: <AllBooks />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
