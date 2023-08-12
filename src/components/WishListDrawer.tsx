import { Link, Outlet } from "react-router-dom";

const WishListDrawer = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* main content */}
      <div className="drawer-content p-10">
        {/* Page content here */}
        <h2 className="text-3xl text-indigo-500">Your Wishlist</h2>
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      {/* main content */}

      {/* side content */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>
          <li>
            <Link to="reading-list">Reading list</Link>
          </li>
          <li>
            <Link to="completed-list">Completed list</Link>
          </li>
        </ul>
      </div>
      {/* side content */}
    </div>
  );
};

export default WishListDrawer;
