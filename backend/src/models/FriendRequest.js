import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    message: {
        type: String,
        maxLength: 300,
    },
}, {timestamps: true});

// create index search
friendRequestSchema.index({from: 1, to: 1}, {unique: true});

export default mongoose.model("FriendRequest", friendRequestSchema);