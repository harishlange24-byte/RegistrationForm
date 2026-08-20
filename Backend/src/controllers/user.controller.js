import UserModel from "../models/user.model.js";
import transporter from "../config/mailer.js";
import dotenv from "dotenv";
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
         console.log("EMAIL USER:", process.env.EMAIL_USER);
             console.log("EMAIL ADMIN:", process.env.EMAIL_ADMIN);

       const info =  await transporter.sendMail(
            
            {
             
            from:process.env.EMAIL_USER,
            to:[
                "harishlange24@gmail.com",
                "amandasgupta975@gmail.com"
            ],

            subject : "New Garba Registration",

            html:`
            <h2>New Garba Registration</h2>
            
            <p><strong>Name : </strong> ${name}</p>
             <p><strong>Age : </strong> ${age}</p>
              <p><strong>Gender : </strong> ${gender}</p>
               <p><strong>Contact : </strong> ${contact}</p>
                <p><strong>Address : </strong> ${address}</p>

                <hr />

                <p>A new user has registered for the Garba event.</p>
                `,
        })
        console.log("Email sent:", info.messageId);
console.log("Accepted:", info.accepted);
console.log("Rejected:", info.rejected);

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
