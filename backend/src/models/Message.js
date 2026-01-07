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
        enum: ["text", "image", "file", "video", "audio", "system"],
        default: "text",
    },
    content: {
        type: String,
        trim: true,
        maxLength: 5000,
    },
    attachments: [
        {
            url: String,
            fileName: String,
        },
    ],
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
        default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
}, {timestamps: true});

// create index search with have sorted by chatId and create time
messageSchema.index({chatId: 1, createdAt: -1});
// create inde search sorted by senderId
messageSchema.index({ senderId: 1 });

export default mongoose.model("Message", messageSchema);