import mongoose, { model } from "mongoose";

// participant schema
const memberSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "member"],
        default: "member",
    },
    joinedAt: {
        type: Date,
        default: Date.now(),
    }
});

// groupinfo schema
const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    avatarUrl: {
        type: String,
        default: null,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },    
}, {_id: false});

// chat schema
const chatSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["direct", "group"],
        required: true,
        index: true,
    },
    members: {
        type: [memberSchema],
        required: true,
    },
    group: {
        type: groupSchema,
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: null,
    },
    lastMessageAt: {
        type: Date,
        index: true,
        default: null,
    },
    unReadCounts: {
        type: Map,
        of: Number,
        default: {},
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {timestamps: true});

// create index search sort by last message time and user participant
chatSchema.index({
    "members.userId": 1,
});
chatSchema.index({"lastMessage.createdAt": -1});

export default mongoose.model("Chat", chatSchema);