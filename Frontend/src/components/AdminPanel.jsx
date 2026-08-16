import React, { useState } from "react";
import {
    loginAdmin,
    getRegistrations,
    deleteRegistration,
} from "../api/client.js";

function AdminPanel() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [token, setToken] = useState(
        localStorage.getItem("adminToken")
    );

    const [registrations, setRegistrations] = useState([]);

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);


    async function handleLogin(e) {

        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {

            const response = await loginAdmin(
                email,
                password
            );

            localStorage.setItem(
                "adminToken",
                response.token
            );

            setToken(response.token);

            setEmail("");
            setPassword("");

            await loadRegistrations(response.token);

        } catch (error) {

            setMessage(error.message);

        } finally {

            setLoading(false);

        }
    }


    async function loadRegistrations(currentToken = token) {

        try {

            const response =
                await getRegistrations(currentToken);

            setRegistrations(response.users);

        } catch (error) {

            setMessage(error.message);

        }
    }


    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this registration?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            setLoading(true);

            const response =
                await deleteRegistration(id, token);

            setMessage(response.message);

            await loadRegistrations();

        } catch (error) {

            setMessage(error.message);

        } finally {

            setLoading(false);

        }
    }


    function handleLogout() {

        localStorage.removeItem("adminToken");

        setToken("");

        setRegistrations([]);

        setMessage("");

    }


    // ADMIN LOGIN
    if (!token) {

        return (

            <div className="content admin-login">

                <h1>Admin Login</h1>

                <p className="subtitle">
                    Login to view event registrations
                </p>


                <form
                    className="glass-form"
                    onSubmit={handleLogin}
                >

                    <div className="field-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter admin email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="field-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>


                    {message && (
                        <p className="error-message">
                            {message}
                        </p>
                    )}


                    <div className="button-row">

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Logging in..."
                                : "Admin Login"}
                        </button>

                    </div>

                </form>

            </div>

        );
    }


    // ADMIN DASHBOARD
    return (

        <div className="admin-content">

            <div className="admin-header">

                <div>

                    <h1>Admin Dashboard</h1>

                    <p>
                        Total Registrations:{" "}
                        <strong>
                            {registrations.length}
                        </strong>
                    </p>

                </div>


                <div className="admin-actions">

                    <button
                        onClick={() => loadRegistrations()}
                    >
                        Refresh
                    </button>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>


            {message && (
                <p className="message admin-message">
                    {message}
                </p>
            )}


            <div className="table-container">

                <table>

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Age</th>

                            <th>Gender</th>

                            <th>Contact</th>

                            <th>Address</th>

                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {registrations.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="empty"
                                >
                                    No registrations found.
                                </td>

                            </tr>

                        ) : (

                            registrations.map((user) => (

                                <tr key={user._id}>

                                    <td>
                                        {user.name}
                                    </td>

                                    <td>
                                        {user.age}
                                    </td>

                                    <td>
                                        {user.gender}
                                    </td>

                                    <td>
                                        {user.contact}
                                    </td>

                                    <td>
                                        {user.address}
                                    </td>

                                    <td>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDelete(
                                                    user._id
                                                )
                                            }
                                            disabled={loading}
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

    );
}

export default AdminPanel;