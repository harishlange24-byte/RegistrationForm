import UserModel from "../models/user.model.js";

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
