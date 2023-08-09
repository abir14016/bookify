import MainLayout from "./layouts/MainLayout";
import { setAccessToken } from "./redux/features/auth/authSlice";
import { useAppDispatch } from "./redux/hooks";

function App() {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");

  // Set the access token in Redux store
  if (accessToken) {
    dispatch(setAccessToken(accessToken));
  }
  return (
    <div>
      <MainLayout />
    </div>
  );
}

export default App;
