import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Login=()=>{
    const { isAuthorized } = useSelector((store) => store.auth);
    if (isAuthorized) {
        return <Navigate to="/" replace />;
      }
    return(
        <div>
            login
        </div>
    )
}

export default Login;