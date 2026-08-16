import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },

},{
    timestamps:true
})

const AdminModel = mongoose.models.Admin || mongoose.model("Admin",AdminSchema);
export default AdminModel;
