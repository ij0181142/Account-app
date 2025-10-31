import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!currentUser) {
      navigate("/login");
    } else {
      setUsers(storedUsers);
      setLoggedUser(currentUser);
    }
  }, [navigate]);

  // Delete a user
  const deleteUser = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // If logged-in user deletes themselves → logout
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (currentUser.email === email) {
      localStorage.removeItem("loggedInUser");
      navigate("/login");
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="vh-100 vw-100 ">
      <div className="  " style={{ borderRadius: "12px" }}>
        <h2 className="text-center mb-3 text-info fw-bold">Registered Users</h2>

        {loggedUser && (
          <p className="text-center text-secondary mb-4">
            Logged in as: <b className="text-dark">{loggedUser.name}</b>
          </p>
        )}
        <button className="btn btn-warning   fw-semibold " onClick={logout}>
          Go To Login Page
        </button>

        <div className="table-responsive">
          <table className="table table-dark table-bordered table-striped text-center align-middle">
            <thead>
              <tr>
                <th className="text-warning">Name</th>
                <th className="text-warning">Email</th>
                <th className="text-warning">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-secondary">
                    No registered users found
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteUser(user.email)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Profile;
