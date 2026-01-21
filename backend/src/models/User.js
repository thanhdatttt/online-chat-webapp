import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const authProviderSchema = new mongoose.Schema({
    provider: {
        type: String,
        enum: ["local", "google", "facebook", "github"],
        required: true,
    },
    providerUserId: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { _id: false });

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        maxlength: 150,
        index: true,
    },
    authProviders: {
        type: [authProviderSchema],
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        index: true,
    },
    displayName: {
        type: String,
        required: true,
        trim: true,
    },
    avatarUrl: {
        type: String,
        default: null,
    },
    bio: {
        type: String,
        maxLength: 500,
        default: null,
    },
    phone: {
        type: String,
        sparse: true, // can be null but must be unique when have value
    },
    status: {
        type: String,
        enum: ["active", "banned"],
        default: "active",
    },
}, {timestamps: true});

// create index search sort by authprovider and must be unique
userSchema.index(
  {
    "authProviders.provider": 1,
    "authProviders.providerUserId": 1,
  },
  { unique: true }
);
userSchema.index({ displayName: 1 });

// hash password before saving to database
userSchema.pre("save", async function() {
    const localProvider = this.authProviders.find(p => p.provider === "local");
    if (!localProvider || !localProvider.isModified("hashedPassword")) {
        return;
    }

    localProvider.hashedPassword = await bcrypt.hash(localProvider.hashedPassword, 10);
});

// compare password
userSchema.methods.comparePassword = function(password) {
    const localProvider = this.authProviders.find(p => p.provider === "local");
    if (!localProvider || !localProvider.hashedPassword) return false;
    return bcrypt.compare(password, localProvider.hashedPassword);
};

export default mongoose.model("User", userSchema);