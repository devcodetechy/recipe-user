import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Passwordreset() {

    const navigate = useNavigate()

    console.log("Token used:", localStorage.getItem("authToken"));

  const [form, setForm] = useState({
    CurrentPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { CurrentPassword, NewPassword, ConfirmPassword } = form;

    // Basic validation
    if (!CurrentPassword || !NewPassword || !ConfirmPassword) {
      alert("All fields are required.");
      return;
    }

    if (NewPassword !== ConfirmPassword) {
      alert("New Password and Confirm Password do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/passwordreset",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      alert("Password reset successful.");
      setForm({ CurrentPassword: "", NewPassword: "", ConfirmPassword: "" });
      navigate('/Login');
    } catch (error) {
      console.error("Password reset error:", error);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="page-background">
      <Navbar />
      <div className="form-group ml-5" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          <h1 className="mt-3 text-center shadow-heading">Password Reset</h1>
          <br />
          <div>
            <label htmlFor="CurrentPassword">Current Password:</label>
            <input
              type="password"
              className="form-control"
              id="CurrentPassword"
              name="CurrentPassword"
              placeholder="Enter your current password"
              value={form.CurrentPassword}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label htmlFor="NewPassword">New Password:</label>
            <input
              type="password"
              className="form-control"
              id="NewPassword"
              name="NewPassword"
              placeholder="Enter your new password"
              value={form.NewPassword}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label htmlFor="ConfirmPassword">Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              id="ConfirmPassword"
              name="ConfirmPassword"
              placeholder="Re-enter your new password"
              value={form.ConfirmPassword}
              onChange={handleChange}
            />
          </div>
          <br />
          <div style={{ textAlign: "center" }}>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Passwordreset;
