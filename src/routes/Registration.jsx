import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import { registerUser } from "../store/authSlice"; // Make sure this is imported

const Registration = () => {
  const { isAuthorized, authStatus, loading, color } = useSelector(
    (store) => store.auth
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState(""); // Password confirmation
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [passwordError, setPasswordError] = useState(""); // Error state for password mismatch
  const dispatch = useDispatch();

  if (isAuthorized) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e)  => {
    e.preventDefault();

    // Password confirmation check
    if (password !== password2) {
      setPasswordError("Passwords do not match!");
      return;
    }
    setPasswordError(""); // Clear error if passwords match
     
    try {
        const result = await dispatch(registerUser({ username, email, password }));
        // Check if the action was successful
        if (registerUser.fulfilled.match(result)) {
            setRedirect(true);
        }
      } catch (error) {
        console.error("Registration failed:", error);
      }
    };



    

  if (redirect) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center w-50 vh-100 mx-auto fw-bold">
      <div className="d-flex flex-column justify-content-center bg-warning w-75 p-3 rounded-2">
        <h4 className="text-center">Register</h4>
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
            <Label for="email">Email:</Label>
            <Input
              type="email"
              required
              placeholder="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <FormGroup>
            <Label for="password2">Confirm Password:</Label>
            <Input
              type="password"
              required
              placeholder="confirm password"
              name="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </FormGroup>
          {passwordError && <Alert color="danger">{passwordError}</Alert>}
          
          {authStatus && <Alert color={color}>{authStatus}</Alert>}
          <div className="w-100 mt-3">
            <Button
              className="w-100 fw-bold"
              disabled={
                !username || !password || !password2 || !email || !password || !password2
              }
              color="dark"
            >
              {loading ? <Spinner size="sm" color="light" /> : "Register"}
            </Button>
          </div>
        </Form>
        <div className="d-flex flex-row mt-2">
          <p>Already have an account? </p>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;



