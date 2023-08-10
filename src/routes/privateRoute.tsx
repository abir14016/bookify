import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { parseAccessToken } from "../utils/utils";
import { IDecoded } from "../types/globalTypes";

interface IProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  let decoded: IDecoded | null = null;
  if (accessToken) {
    decoded = parseAccessToken(accessToken) as IDecoded;
  }

  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Simulating end of loading after component mounts
  }, []);

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }

  if (decoded?.userEmail) {
    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
