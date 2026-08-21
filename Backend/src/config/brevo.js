import { BrevoClient } from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});
console.log(
    "BREVO KEY EXISTS:",
    !!process.env.BREVO_API_KEY
);

export default brevo;