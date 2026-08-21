import UserModel from "../models/user.model.js";
import resend from "../config/resend.js";
import dotenv from "dotenv";
import brevo from "../config/brevo.js";

dotenv.config();

async function Registration(req, res) {
    try {
        const { name, age, gender, contact, address } = req.body;

        if (!name || !age || !gender || !contact || !address) {
            return res.status(400).json({
                success: false,
                message: "Enter every field",
            });
        }

        const user = await UserModel.create({
            name,
            age,
            gender,
            contact,
            address,
        });

        const result = await brevo.transactionalEmails.sendTransacEmail({
    sender: {
        name: "Garba Registration",
        email: "harishlange24@gmail.com",
    },

    to: [
        {
            email: "harishlange24@gmail.com",
        },
        {
            email: "amandasgupta975@gmail.com",
        },
    ],

    subject: "New Garba Registration",

    htmlContent: `
        <h2>New Garba Registration</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>Address:</strong> ${address}</p>

        <hr />

        <p>A new user has registered for the Garba event.</p>
    `,
});

console.log("EMAIL SENT SUCCESSFULLY:", result);

       /* const { data, error } = await resend.emails.send({
            from: "Garba Registration <onboarding@resend.dev>",

            to: process.env.EMAIL_ADMIN,

            subject: "New Garba Registration",

            html: `
                <h2>New Garba Registration</h2>

                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Age:</strong> ${age}</p>
                <p><strong>Gender:</strong> ${gender}</p>
                <p><strong>Contact:</strong> ${contact}</p>
                <p><strong>Address:</strong> ${address}</p>

                <hr />

                <p>A new user has registered for the Garba event.</p>
            `,
        });
        console.log("🔥 RESEND RESPONSE:", { data, error });

        if (error) {
            console.error("RESEND EMAIL ERROR:", error);
        } else {
            console.log("EMAIL SENT SUCCESSFULLY:", data);
        }*/

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });

    } catch (err) {

        if (err.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Registration failed",
            error: err.message,
        });
    }
}

export default Registration;
