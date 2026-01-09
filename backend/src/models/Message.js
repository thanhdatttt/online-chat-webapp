import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    emoji: {
        type: String,
        required: true,
    }
});

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
        index: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    type: {
        type: String,
        enum: ["text", "image", "file", "video", "audio"],
        default: "text",
    },
    content: {
        type: String,
        trim: true,
        maxLength: 5000,
    },
    attachments: {
        type: [
            {
                url: String,
                fileName: String,
                size: Number,
            },
        ],
        default: [],
    },
    seenBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    reactions: {
        type: [reactionSchema],
        default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
}, {timestamps: true});

// create index search with have sorted by chatId and create time
messageSchema.index({chatId: 1, createdAt: -1});

export default mongoose.model("Message", messageSchema);