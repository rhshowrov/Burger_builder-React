import "./App.css";
import { Navigate, Outlet, } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";

function App() {
  const { isAuthorized } = useSelector((store) => store.auth);
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
