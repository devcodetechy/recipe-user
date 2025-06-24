import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {

    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()

    function attemptlogin(e){

        e.preventDefault();

        var user = {
            email: email,
            password: password,
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/userlogin`,user)
        .then(response=>{
            const token = response.data.token;
            setErrorMessage(''); 
            localStorage.setItem('authToken',token)
            navigate('/Recipes');
        }).catch(error => {
            if (error.response?.data?.error) {
                setErrorMessage(Object.values(error.response.data.error).join(' '));
            } else if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Failed to connect to API');
            }
        });
    }

    return (
        <>
        <div className="page-background">
            <div className="form-group" style={{ minWidth: '300px' }}>
                <form className="">
                    <h1 className="mt-3 text-center shadow-heading">Login</h1>
                    {errorMessage? <div className="alert alert-danger">{errorMessage}</div> : ''}
                    <div className="">
                        <label for="email">Email:</label>
                        <input type="text" 
                            className="form-control" 
                            id="email" 
                            name="email" 
                            placeholder="Email" 
                            value={email} 
                            onInput={(event)=>setEmail(event.target.value)}
                        />
                    </div><br></br>
                    <div className="">
                        <label>Password : </label>
                        <input type="password" 
                            className="form-control" 
                            name="password" 
                            placeholder="Password" 
                            value={password} 
                            onInput={(event)=>setPassword(event.target.value)}
                            />
                    </div><br></br>
                    <div style={{ textAlign: 'center' }}>
                        <button onClick={attemptlogin} type="submit" className="button btn btn-primary rounded">Submit</button>
                    </div><br></br>
                    <div style={{ textAlign: 'center' }}>
                        <a href="/Signup" className="text-decoration-underline" style={{fontFamily:'-moz-initial'}}>Don't have an account? Signup</a>
                    </div>
                </form>
            </div>
            </div></>
    );
};

export default Login;