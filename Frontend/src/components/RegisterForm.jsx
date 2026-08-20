import React, { useState } from "react";
import { registerUser } from "../api/client.js";
import {toast} from "react-toastify";

function RegisterForm() {

    const [form, setForm] = useState({
        name: "",
        address: "",
        contact: "",
        age: "",
        gender: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }


    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);
        
        try {

            const data = {
                ...form,
                age: Number(form.age),
            };

            const response = await registerUser(data);

           toast.success(" 🤗You are registered!🤩  🎉 ",{
            position:"top-center",
            autoClose:2500,
            hideProgressBar:false,
            closeOnClick:true,
            pauseOnHover:true,
            draggable:true,
           });

            setForm({
                name: "",
                address: "",
                contact: "",
                age: "",
                gender: "",
            });

        } catch (error) {

            toast.error(
                error.message || "Registration failed. Please try again.",
                {
                    position: "top-center",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );

        } finally {

            setLoading(false);

        }
    }


    function handleReset() {

        setForm({
            name: "",
            address: "",
            contact: "",
            age: "",
            gender: "",
        });

        setMessage("");
    }


    return (
        <div className="content">

            <h1>Garba Registration</h1>

            <p className="subtitle">
                Register yourself for the upcoming Garba event
            </p>


            <form
                className="glass-form"
                onSubmit={handleSubmit}
            >

                <div className="field-group">

                    <label>Name</label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                </div>


                <div className="field-group">

                    <label>Address</label>

                    <textarea
                        name="address"
                        placeholder="Enter your address"
                        value={form.address}
                        onChange={handleChange}
                        required
                    />

                </div>


                <div className="field-group">

                    <label>Contact</label>

                    <input
                        type="tel"
                        name="contact"
                        placeholder="Enter contact number"
                        value={form.contact}
                        onChange={handleChange}
                        required
                    />

                </div>


                <div className="field-group">

                    <label>Age</label>

                    <input
                        type="number"
                        name="age"
                        min="1"
                        max="120"
                        placeholder="Enter your age"
                        value={form.age}
                        onChange={handleChange}
                        required
                    />

                </div>


                <div className="field-group">

                    <label>Gender</label>

                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>

                </div>


                {message && (
                    <p className="message">
                        {message}
                    </p>
                )}


                <div className="button-row">

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Submitting..."
                            : "Submit"}
                    </button>


                    <button
                        type="button"
                        className="reset-btn"
                        onClick={handleReset}
                    >
                        Reset
                    </button>

                </div>

            </form>

        </div>
    );
}

export default RegisterForm;