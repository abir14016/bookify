import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import App from "../App";
import SignIn from "../pages/SignIn";
import BookDetail from "../pages/BookDetail";
import AllBooks from "../pages/AllBooks";
import AddBook from "../pages/AddBook";
import PrivateRoute from "./privateRoute";
import WishListDrawer from "../components/WishListDrawer";
import WishList from "../pages/WishList";
import ReadingList from "../pages/ReadingList";
import CompletedList from "../pages/CompletedList";

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
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <WishListDrawer />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <WishList />,
          },
          {
            path: "reading-list",
            element: <ReadingList />,
          },
          {
            path: "completed-list",
            element: <CompletedList />,
          },
        ],
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
