import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    const user = {
      name: name,
      email: email,
      password: password,
      confirmPassword: passwordConf
    };

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/signupapi`, user)
        
      .then(response => {
        console.log('API response:', response);
        console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);

        setErrorMessage('');
        navigate('/Login');
      })
      .catch(error => {
        if (error.response?.data?.error) {
          setErrorMessage(Object.values(error.response.data.error).join(' '));
        } else if (error.response?.data?.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Failed to connect to API');
        }
      });
  };

  return (
    <div className="page-background">
      <div style={{ minWidth: '300px' }}>
        <h2 className="mt-3 text-center shadow-heading">Sign Up</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              value={name}
              type="text"
              id="name"
              className="form-control"
              onInput={(e) => setName(e.target.value)}
            /><br />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              value={email}
              type="email"
              id="email"
              className="form-control"
              onInput={(e) => setEmail(e.target.value)}
            /><br />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              value={password}
              type="password"
              id="password"
              className="form-control"
              onInput={(e) => setPassword(e.target.value)}
            /><br />
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password: </label>
            <input
              value={passwordConf}
              type="password"
              id="confirm-password"
              className="form-control"
              onInput={(e) => setPasswordConf(e.target.value)}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <button onClick={registerUser} type="submit" className="button btn btn-primary rounded mt-4">
              Submit
            </button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <a href="/Login" className="text-decoration-underline" style={{ fontFamily: '-moz-initial' }}>
              Already have an account? Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
