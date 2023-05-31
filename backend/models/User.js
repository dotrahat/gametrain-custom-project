import mongoose from "mongoose";

const User = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,        
    },
    credits: {
        type: Number
    },
    inputs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Input',
        unique: true
    }],
    outputs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Output',
        unique: true
    }],
    
},

{timestamps: true}

)

export default mongoose.model("users", User);