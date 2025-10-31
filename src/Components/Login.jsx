import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (matchedUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      navigate("/profile");
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 vw-100 bg">
      <div
        className="card shadow-lg p-5"
        style={{ width: "450px", borderRadius: "12px" }}
      >
        <h3 className="text-center mb-4 fw-bold text-primary">
          Welcome Back 👋
        </h3>
        <p className="text-center text-muted mb-4">
          Login to access your account
        </p>

        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control border-start-0"
                placeholder="Enter email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type="password"
                className="form-control border-start-0"
                placeholder="Enter password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            className="btn btn-primary w-100 py-2 fw-semibold"
            type="submit"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <small className="text-muted">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-decoration-none text-primary fw-bold"
            >
              Sign up
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;
