/*eslint-disable */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest,registerRequest } from "../Redux/authorizationSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const authError = useSelector((state) => state.auth.error);
  const token = useSelector((state) => state.auth.token);
  const message = useSelector((state) => state.auth.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async function (e) {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginRequest(credentials));
    } else {
      dispatch(registerRequest(credentials));
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setCredentials({ username: "", password: "" });
  };

  useEffect(() => {
    if (authError) {
      toast.error(authError);
    } else if (!authError && token && isLogin) {

      navigate(`/${credentials.username}/Home`, {
        state: { message: message },
      });
    }
    else if(token && !isLogin){
      toast.success(message)
    }
  }, [authError , token , navigate]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <header>Welcome to Song App</header>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            <input
              name="username"
              id="username"
              placeholder="Username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="password">
            <input
              name="password"
              id="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
          <button type="button" onClick={toggleMode}>
            {isLogin ? "Switch to Register" : "Switch to Login"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;

