import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUserApi, registerUserApi } from "../Api/Api.js";
import { loginSuccess } from "../Redux/authorizationSlice.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const authError = useSelector((state) => state.auth.error);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async function (e) {
    e.preventDefault();
    if (isLogin) {
      const res = await loginUserApi(username, password);
      const token = res.token;
      localStorage.setItem("token", token);
      dispatch(loginSuccess(res.token));
    } else {
      const res = await registerUserApi(username, password);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (authError === null && token) {
      navigate(`/${username}/Home`);
    }
  }, [authError, token, navigate]);

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <input
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label htmlFor="password">
          <input
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      {authError && <div>{authError}</div>}
      <button onClick={toggleMode}>
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>
    </div>
  );
};

export default Login;
