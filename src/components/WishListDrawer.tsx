import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { parseAccessToken } from "../utils/utils";
import { IDecoded } from "../types/globalTypes";

const WishListDrawer = () => {
  const { accessToken } = useAppSelector((state) => state.auth);
  let decoded: IDecoded | null = null;
  if (accessToken) {
    decoded = parseAccessToken(accessToken) as IDecoded;
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* main content */}
      <div className="drawer-content p-10">
        {/* Page content here */}
        <div>
          <p className="font-semibold font-mono">
            {decoded?.userName}
            {","}
          </p>
          <h2 className="text-3xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
            Your Dashboard
          </h2>
        </div>
        <div className="divider"></div>
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
