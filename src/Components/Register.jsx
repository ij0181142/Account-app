import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required!");
      return;
    }

    // Get existing users from localStorage or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    const userExists = existingUsers.find((u) => u.email === form.email);
    if (userExists) {
      setError("User with this email already exists!");
      return;
    }

    // Add new user to array and save
    existingUsers.push(form);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 vw-100 bg1">
      <div
        className="card shadow p-4"
        style={{ width: "420px", borderRadius: "12px" }}
      >
        <h3 className="text-center mb-4 text-success">Create Your Account</h3>

        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your full name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Create a password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button
            className="btn btn-success w-100 py-2 fw-semibold"
            type="submit"
          >
            Sign up
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-decoration-none text-success fw-semibold"
            >
              Login here
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Register;
