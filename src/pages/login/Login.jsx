import axios from "axios";
import { useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import toast from "react-hot-toast";
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
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!credentials.username?.trim()){
      toast.error('Enter the username');
      return;
    }
    else if(!usernameRegex.test(credentials.username)){
      toast.error('Invalid username');
      return;
    }

    if(!credentials.password?.trim()){
      toast.error('Enter the password');
      return;
    }
    else if(!passwordRegex.test(credentials.password)){
      toast.error('Invalid password value');
      return;
    }

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
