import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GitHubStrategy } from "passport-github2";
import { config } from "./config.js";
import passport from "passport";
import User from "../models/User.js";

// google strategy 
passport.use(new GoogleStrategy(
    {
        clientID: config.GG_CLIENT_ID,
        clientSecret: config.GG_CLIENT_SECRET,
        callbackURL: config.GG_CLIENT_CALLBACK,
    },
    // verify
    async (accessToken, refreshToken, profile, cb) => {
        try {
            const googleId = profile.id;
            const email = profile.emails?.[0]?.value;
            const displayName = profile.displayName;
            const avatarUrl = profile.photos?.[0].value;

            // check google user
            let user = await User.findOne({
                authProviders: {
                    $elemMatch: {
                        provider: "google",
                        providerUserId: googleId,
                    }
                }
            });
            if (user) {
                return cb(null, user);
            }

            // check email have been used
            user = await User.findOne({email});
            if (user) {
                user.authProviders.push({
                    provider: "google",
                    providerUserId: googleId,
                });
                await user.save();

                return cb(null, user);
            }

            const baseUsername = email.split("@")[0];
            const username = `${baseUsername}_${googleId.slice(0, 6)}`;
            // create new user
            user = await User.create({
                username,
                email,
                displayName,
                avatarUrl,
                authProviders: [{
                    provider: "google",
                    providerUserId: googleId,
                }],
            });

            return cb(null, user);
        } catch (err) {
            console.log(err.message);
            return cb(err, null);
        }
    }
));

// facebook strategy
passport.use(new FacebookStrategy(
    {
        clientID: config.FB_CLIENT_ID,
        clientSecret: config.FB_CLIENT_SECRET,
        callbackURL: config.FB_CLIENT_CALLBACK,
        profileFields: ["id", "displayName", "emails"],
    },

    async (accessToken, refreshToken, profile, cb) => {
        try {
            const facebookId = profile.id;
            const email = profile.emails?.[0]?.value;
            const displayName = profile.displayName;
            const avatarUrl = `https://graph.facebook.com/${facebookId}/picture?type=large`;

            // check user
            let user = await User.findOne({
                authProviders: {
                    $elemMatch: {
                        provider: "facebook",
                        providerUserId: facebookId,
                    }
                }
            });
            if (user) {
                return cb(null, user);
            }

            // check email
            user = await User.findOne({email});
            if (user) {
                user.authProviders.push({
                    provider: "facebook",
                    providerUserId: facebookId,
                });
                return cb(null, user);
            }

            const baseUsername = email.split("@")[0];
            const username = `${baseUsername}_${facebookId.slice(0, 6)}`;
            // create new user
            user = await User.create({
                username,
                email,
                displayName,
                avatarUrl,
                authProviders: [
                    {
                        provider: "facebook",
                        providerUserId: facebookId,
                    }
                ],
            });

            return cb(null, user);
        } catch (err) {
            console.log(err.message);
            return cb(err, null);
        }
    }
))

// github strategy
passport.use(new GitHubStrategy(
    {
        clientID: config.GIT_CLIENT_ID,
        clientSecret: config.GIT_CLIENT_SECRET,
        callbackURL: config.GIT_CLIENT_CALLBACK,
        scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, cb) => {
        try {
            const githubId = profile.id;
            const displayName = profile.displayName || profile.username;
            const avatarUrl = profile.photos?.[0]?.value || null;

            // 🔴 GitHub KHÔNG đảm bảo email
            let email =
            profile.emails?.find(e => e.primary && e.verified)?.value ||
            profile.emails?.[0]?.value;
            if (!email) {
                email = `${githubId}@github.local`;
            }

            // check user
            let user = await User.findOne({
                authProviders: {
                    $elemMatch: {
                        provider: "github",
                        providerUserId: githubId,
                    },
                },
            });
            if (user) return cb(null, user);

            // check user email
            user = await User.findOne({ email });
            if (user) {
                user.authProviders.push({
                    provider: "github",
                    providerUserId: githubId,
                });
                await user.save();
                return cb(null, user);
            }

            const baseUsername = email.split("@")[0];
            const username = `${baseUsername}_${githubId.slice(0, 6)}`;
            user = await User.create({
                username,
                email,
                displayName,
                avatarUrl,
                authProviders: [
                    {
                    provider: "github",
                    providerUserId: githubId,
                    },
                ],
            });

            return cb(null, user);
        } catch (err) {
            return cb(err, null);
        }
    }
));

export default passport;