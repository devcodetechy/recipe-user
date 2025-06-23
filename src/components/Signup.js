import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";



const Signup = () => {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConf, setPasswordConf] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();

    function registeruser(e){

        e.preventDefault();

        var user = {
            name: name,
            email: email,
            password: password,
            confirmPassword: passwordConf
        }
        axios.post('http://localhost:3001/signupapi',user).then(response=>{
            console.log('API response:', response);
            setErrorMessage('');
            navigate('/Login');
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
            <div className="" style={{ minWidth: '300px' }}>
                <h2 className="mt-3 text-center shadow-heading">Sign Up</h2>
                {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
                <form>
                    <div className="">
                        <label htmlFor="name">Name: </label>
                        <input
                            value={name}
                            type="text"
                            id="name"
                            className="form-control" 
                            onInput={(event)=>setName(event.target.value)}
                            /><br></br>
                    </div>
                    <div className="">
                        <label htmlFor="email">Email: </label>
                        <input
                            value={email}
                            type="text"
                            id="email"
                            className="form-control" 
                            onInput={(event)=>setEmail(event.target.value)}
                            /><br></br>
                    </div>
                    <div className="">
                        <label htmlFor="password">Password: </label>
                        <input
                            value={password}
                            type="password"
                            id="password"
                            className="form-control" 
                            onInput={(event)=>setPassword(event.target.value)}
                            /><br></br>
                    </div>
                    <div className="">
                        <label htmlFor="confirm password">Confirm Password: </label>
                        <input
                            value={passwordConf}
                            type="password"
                            id="confirm password"
                            className="form-control" 
                            onInput={(event)=>setPasswordConf(event.target.value)}
                            />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button onClick={registeruser} type="submit" className="button btn btn-primary rounded mt-4">Submit</button>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <a href="/Login" className="text-decoration-underline" style={{fontFamily:'-moz-initial'}}>Already have an account? login</a>
                    </div>
                </form>
            </div>
            </div></>

    );

};

export default Signup ;