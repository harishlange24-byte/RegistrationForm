import nodemailer from "nodemailer";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

console.log("🔥 MAILER.JS LOADED");

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
});

transporter.verify()
    .then(() => {
        console.log("✅ EMAIL SERVER IS READY");
    })
    .catch((error) => {
        console.error("❌ EMAIL VERIFY FAILED:", error);
    });

export default transporter;
