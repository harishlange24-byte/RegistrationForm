console.log("🔥 MAILER.JS LOADED");
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify((error, success) => {

    if (error) {
        console.log("EMAIL CONFIGURATION ERROR:", error);
    } else {
        console.log("EMAIL SERVER IS READY");
    }

});

export default transporter;
