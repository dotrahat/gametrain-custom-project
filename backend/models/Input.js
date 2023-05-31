import mongoose from "mongoose";

const Input = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    output_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Output'
    }],
    input_text: {
        type: String,
        required: true,
        trim: true
    }
},

{timestamps: true}

)

export default mongoose.model("inputs", Input);