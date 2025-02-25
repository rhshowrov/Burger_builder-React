import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { loginUser } from "../store/authSlice";

const Login = () => {
  const { isAuthorized, authStatus, loading, color } = useSelector((store) => store.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false); // New state for redirection
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthorized) {
      setTimeout(() => setRedirect(true), 2000); // Redirect after 2 seconds
    }
  }, [isAuthorized]);

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-50 vh-100 mx-auto fw-bold">
      <div className="d-flex flex-column justify-content-center bg-warning w-75 p-3 rounded-2">
        <h4 className="text-center">Login</h4>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Username:</Label>
            <Input
              type="text"
              required
              placeholder="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password:</Label>
            <Input
              type="password"
              required
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          {authStatus && <Alert color={color}>{authStatus}</Alert>}
          <div className="w-100 mt-3">
            <Button className="w-100 fw-bold" disabled={!username || !password} color="dark">
              {loading ? <Spinner size="sm" color="light" /> : "Login"}
            </Button>
          </div>
        </Form>
        <div className="d-flex flex-row mt-2">
          <p>Don't have an account? </p>
          <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

