import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import AdminModel from "../models/admin.model.js";
import UserModel from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

async function createAdmin(req,res){
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email and password are required"
            })
        }

        const existingAdmin = await AdminModel.findOne({email})
        if(existingAdmin){
            return res.status(400).json({
                success:false,
                message:"Admin already exist",
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const admin  = await AdminModel.create({
            email,
            password:hashedPassword,
        })
        return res.status(201).json({
            success:true,
            message:"Admin Created Successfully",
            admin:{
                id : admin._id,
                email : admin.email,
            },
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to create admin",
            error:err.message,
        })
    }
}

    async function adminLogin(req,res) {
         try{
              const {email,password} = req.body;
              if(!email || !password) {
                return res.status(400).json({
                    success:false,
                    message:"Email and password are required",
                })
              }
              const admin = await AdminModel.findOne({email})
              if(!admin){
                return res.status(401).json({
                    success:false,
                    message:"Invalid email or Password",
                })
              }

              const isPasswordCorrect = await bcrypt.compare(
                password,
                admin.password
              )
              if(!isPasswordCorrect){
                return res.status(401).json({
                    success:false,
                    message:"Invalid email or Password",
                })
              }

              const token = jwt.sign({
                adminId : admin._id,

              },process.env.JWT_SECRET,
            {expiresIn:"1d",

            })
             return res.status(200).json({
            success: true,
            message: "Admin login successful",
            token,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Login failed",
            error: err.message,
        });
    }
         }

         async function getAllUsers(req, res) {
    try {
        const users = await UserModel.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: users.length,
            users,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch registrations",
            error: err.message,
        });
    }
}

// DELETE REGISTRATION
async function deleteUser(req, res) {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Registration not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Registration deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete registration",
            error: err.message,
        });
    }
}


export {
    createAdmin,
    adminLogin,
    getAllUsers,
    deleteUser,
}

    
