import express from "express";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.use("/api/admin",adminRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Registration API is running",
    });
});

export default app;
