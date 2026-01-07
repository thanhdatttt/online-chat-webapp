import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        maxLength: 300,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected", "cancelled"],
        default: "pending",
        index: true,
    },
}, {timestamps: true});

// create index search
friendRequestSchema.index({from: 1, to: 1}, {unique: true});
friendRequestSchema.index({from: 1});
friendRequestSchema.index({to: 1});


export default mongoose.model("FriendRequest", friendRequestSchema);