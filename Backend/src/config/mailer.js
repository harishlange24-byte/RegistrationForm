import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("🔥 MAILER.JS LOADED");
console.log("EMAIL USER:", process.env.EMAIL_USER);
console.log("EMAIL PASS EXISTS:", !!process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
});

console.log("🔥 TRANSPORTER CREATED");

transporter.verify()
    .then(() => {
        console.log("✅ EMAIL SERVER IS READY");
    })
    .catch((error) => {
        console.log("❌ EMAIL VERIFY FAILED");
        console.log(error);
    });

export default transporter;
