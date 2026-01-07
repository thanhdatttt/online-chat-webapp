import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
    userA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userB: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "blocked"],
        default: "active",
        index: true,
    },
    blockedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
}, {timestamps: true});

// rearrange users before save
friendSchema.pre("save", function(next) {
    const a = this.userA.toString();
    const b = this.userB.toString();

    if (a > b) {
        this.userA = new mongoose.Types.ObjectId(b);
        this.userB = new mongoose.Types.ObjectId(a);
    }

    next();
});

// create index search
friendSchema.index({
    userA: 1,
    userB: 1,
}, {unique: true});

export default mongoose.model("Friend", friendSchema);