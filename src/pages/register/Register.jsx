import axios from "axios";
import {useState } from "react";
import {useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./register.css";

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
        email: undefined,
    });
  
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_BACKEND_URL;

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleRegister=async(e)=>{
        e.preventDefault();
        const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
        const countryOrCityRegex = /^[A-Za-zÀ-ÿ'’ -]{2,50}$/;

        if(credentials.username==="" || credentials.username===undefined){
            toast.error('Enter the name');
            return;
        }
        else if(!usernameRegex.test(credentials.username)){
            toast.error('Invalid username');
            return;
        }

        if(credentials.email==="" || credentials.email===undefined){
            toast.error('Enter the email');
            return;
        }
        else if(!emailRegex.test(credentials.email)){
            toast.error('Invalid email');
            return;
        }

        if(credentials.password==="" || credentials.password===undefined){
            toast.error('Enter the password');
            return;
        }
        else if(!passwordRegex.test(credentials.password)){
            toast.error('Invalid password. Please use at least 8 characters with a mix of uppercase, lowercase, numbers, and special symbols.');
            return;
        }

        if(credentials.phone==="" || credentials.phone===undefined){
            toast.error('Enter the phone no.');
            return;
        }
        else if(!phoneRegex.test(credentials.phone)){
            toast.error('Invalid phone number. Please enter a valid 10-digit number.');
            return;
        }

        if(credentials.country==="" || credentials.country===undefined){
            toast.error('Enter the country');
            return;
        }
        else if(!countryOrCityRegex.test(credentials.country)){
            toast.error('Invalid country name');
            return;
        }

        if(credentials.city==="" || credentials.city===undefined){
            toast.error('Enter the city');
            return;
        }
        else if(!countryOrCityRegex.test(credentials.country)){
            toast.error('Invalid city name');
            return;
        }

        try {
            const res = await axios.post(`${baseURL}/auth/register`,credentials);
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