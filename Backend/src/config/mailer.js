import nodemailer from "nodemailer";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    requireTLS: true,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },

    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
});

transporter.verify()
    .then(() => {
        console.log("✅ EMAIL SERVER IS READY");
    })
    .catch((error) => {
        console.error("❌ EMAIL VERIFY FAILED:", error);
    });

export default transporter;
