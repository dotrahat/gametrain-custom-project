import mongoose from "mongoose";

const Output = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    input_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Input',
        required: true
    },
    output_text: {
        type: String,
        required: true,
        trim: true
    }
},

{timestamps: true}

)

export default mongoose.model("outputs", Output);