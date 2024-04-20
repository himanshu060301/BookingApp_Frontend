import axios from "axios";
import {useState } from "react";
import {useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
        email: undefined,
    });
  
    const navigate = useNavigate();

    const handleChange = (e) => {
        console.log(e.target.value);
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleRegister=async(e)=>{
        e.preventDefault();
        try {
            console.log(credentials);
            const res = await axios.post("/auth/register",credentials);
            console.log(res);
            if(res.data===true){
                navigate("/");
            }   
        } catch (error) {
            console.log(e);
        }
    }

    return (
        <div className="app">
            <form onSubmit={handleRegister}>
                <div className='form-inner'>
                    <h2>Sign In</h2>
                    <div className='form-group'>
                        <label htmlFor="name">Name</label>
                        <input className="input" type="text" name="username" id="username" onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input className="input" type="email" name="email" id="email" onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input className="input" type="password" name="password" id="password" onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="phone">Phone No.</label>
                        <input className="input" type="text" name="phone" id="phone" onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="country">Country</label>
                        <input className="input" type="text" name="country" id="country" onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="city">City</label>
                        <input className="input" type="text" name="city" id="city" onChange={handleChange} />
                    </div>
                    <input className="input" type="submit" value="SIGN IN" />
                </div>
            </form>
        </div>
    );
};
export default Register;