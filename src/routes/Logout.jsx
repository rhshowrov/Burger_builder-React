import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authSliceAction } from "../store/authSlice";

const Logout = () => {
  const { isAuthorized } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  // Only perform logout actions if the user is authenticated
  if (isAuthorized) {
    // Clear tokens from localStorage
    // Dispatch the logout action to update Redux state
    dispatch(authSliceAction.logout());

    // Optionally: Call a backend logout API to invalidate tokens
    // Example:
    // await api.post("/api/logout/", { refresh_token: localStorage.getItem("refresh_token") });
  }

  // Redirect to login page
  return <Navigate to="/login" />;
};

export default Logout;