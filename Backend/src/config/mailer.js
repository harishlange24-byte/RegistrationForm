console.log("🔥 MAILER.JS LOADED");
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


console.log("EMAIL USER:", process.env.EMAIL_USER);
console.log("EMAIL PASS EXISTS:", !!process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
console.log("🔥 TRANSPORTER CREATED");
transporter.verify((error, success) => {

    if (error) {
        console.log("EMAIL CONFIGURATION ERROR:", error);
    } else {
        console.log("EMAIL SERVER IS READY");
    }

});

export default transporter;
