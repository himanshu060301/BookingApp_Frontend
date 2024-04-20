import axios from "axios";
import { useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  const handleChange = (e) => {
    console.log(e.target.value);
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${baseURL}/auth/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/home");
    } catch (err) {
      console.log("Error in login");
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
      <h3>Log in to Explore</h3>
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <div className="Button">
          <button disabled={loading} onClick={handleClick} className="btn">
            Login
          </button>
          <Link to="/register"><button disabled={loading} className="btn">
            Sign In
          </button></Link>
        </div>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
