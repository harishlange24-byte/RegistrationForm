import React, { useState } from "react";
import RegisterForm from "./components/RegisterForm";
import AdminPanel from "./components/AdminPanel";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [page, setPage] = useState("register");

    return (
        <div className="app">

            <div className="background-overlay"></div>

            <div className="top-buttons">
                <button
                    className={page === "register" ? "nav-btn active" : "nav-btn"}
                    onClick={() => setPage("register")}
                >
                    Registration
                </button>

                <button
                    className={page === "admin" ? "nav-btn active" : "nav-btn"}
                    onClick={() => setPage("admin")}
                >
                    Admin
                </button>
            </div>


            {page === "register" ? (
                <RegisterForm />
            ) : (
                <AdminPanel />
            )}

            <ToastContainer 
            position="top-center"
            autoClose={2500}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"/>

        </div>
    );
}

export default App;