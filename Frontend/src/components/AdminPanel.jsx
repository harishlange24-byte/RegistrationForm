import React, { useState } from "react";
import {toast} from "react-toastify";
import {
    loginAdmin,
    getRegistrations,
    deleteRegistration,
} from "../api/client.js";

function AdminPanel() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [deleteUser,setDeleteUser] = useState(null);

    const [token, setToken] = useState(
        localStorage.getItem("adminToken")
    );

    const [registrations, setRegistrations] = useState([]);

  
    const [loading, setLoading] = useState(false);


    async function handleLogin(e) {

        e.preventDefault();

        setLoading(true);
        

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

            toast.success("Login Successful!", {
                autoClose:2500,
            });

            await loadRegistrations(response.token);

        } catch (error) {

           toast.error(
                error.message || "Login failed. Please try again.",
                {
                    autoClose: 2500,
                }
            );

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

           toast.error(
            error.message || "Failed to load registrations.",
            {
                autoClose:2500,
            }
           )
        }
    }

    function handleDelete(user){
        setDeleteUser(user);
    }

    async function confirmDelete() {
        if(!deleteUser){
            return;
        }
        try{
            setLoading(true);
            const response = await deleteRegistration(
                deleteUser._id,
                token
            );
            toast.success(
                response.message || "Registration delete successfuly.",
                {
                    autoClose:2500,
                }

            );
            setDeleteUser(null);
            await loadRegistrations();
        }catch(error){
            toast.error(
                error.message || "Failed to delete registration.",
                {
                    autoClose:2500,
                }
            );
        }finally{
            setLoading(false);
        }
    }

/*
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

            toast.success(
                response.message || "Registration deleted successfully.",
                {
                    autoClose:2500,
                }
            )

            await loadRegistrations();

        } catch (error) {

            toast.error(
                error.message || "Failed to delete registration.",
                {
                    autoClose: 3500,
                }
            );
        } finally {

            setLoading(false);

        }
    }
*/

    function handleLogout() {

        localStorage.removeItem("adminToken");

        setToken("");

        setRegistrations([]);

     toast.info("You have been logged out.",{
        autoClose:2500,
     })

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
                        disabled={loading}
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
                                                    user
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
            {/*Delete Modal */}
            {deleteUser && (
                <div className="delete-modal-overlay">
                    <div className="delete-modal">
                        <div className="delete-modal-icon">
                              ⚠
                        </div>
                        <h2>Delete Registration?</h2>
                        <p>Are you sure you want to delete
                        <strong> {deleteUser.name}</strong>
                        </p>
                        <span className="delete-warning">
                            This action cannot be undone.
                        </span>
                        <div className="delete-modal-actions">
                            <button className="cancel-delete-btn"
                            onClick={()=>setDeleteUser(null)}
                            disabled={loading}>
                                Cancel
                            </button>
                            <button className="confirm-delete-btn"
                            onClick={confirmDelete}
                            disabled={loading}>
                                {loading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>

    );
}

export default AdminPanel;