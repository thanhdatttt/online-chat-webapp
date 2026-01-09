import { response } from "../utils/response.util.js";
import User from "../models/User.js";
import Friend from "../models/Friend.js";
import FriendRequest from "../models/FriendRequest.js";

// send friend request
export const addFriend = async (req, res) => {
    try {
        const {to, message} = req.body;
        const from = req.user._id;

        // check userId
        if (!to || from === to) {
            return response.error(res, "Bad request", "No user id or send request to yourself", 400);
        }

        // check user exists
        const isUser = await User.exists({_id: to});
        if (!isUser) {
            return response.error(res, "Not found", "User not found", 404);
        }

        // check is friend or friend request exists
        let userA = from.toString();
        let userB = to.toString();
        if (userA > userB) {
            [userA, userB] = [userB, userA];
        }
        const [isFriend, existRequest] = await Promise.all([
            Friend.findOne({userA, userB}),
            // two way
            FriendRequest.findOne({
                $or: [
                    {from, to},
                    {from: to, to: from},
                ],
            })
        ]);
        if (isFriend) {
            return response.error(res, "Bad request", "Already friend", 400);
        }
        if (existRequest) {
            return response.error(res, "Bad request", "Request already exists", 400);
        }

        // create request
        const request = await FriendRequest.create({
            from,
            to,
            message,
        });
        return response.success(res, {request}, "Send friend request successfully", 201);
    } catch (err) {
        console.log("Error when add friend: ", err.message);
        return response.error(res, "System error", err.message, 500);
    }
}

// accept friend request
export const acceptFriendRequest = async (req, res) => {
    try {
        const {requestId} = req.params;
        const userId = req.user._id;

        // check request exists
        const request = await FriendRequest.findById(requestId);
        if (!request) {
            return response.error(res, "Not found", "Request not found", 404);
        }

        // check if allowed
        if (request.to.toString() !== userId.toString()) {
            return response.error(res, "Forbidden", "Not allow to do this", 403);
        }

        // create friend
        await Friend.create({
            userA: request.from,
            userB: request.to,
        });
        // remove friend request after accepting
        await FriendRequest.findByIdAndDelete(requestId);
        const newFriend = await User.findById(request.from).lean();
        return response.success(res, {newFriend}, "Accept request successfully", 200);
    } catch (err) {
        console.log("Error when accept friend: ", err.message);
        return response.error(res, "System error", err.message, 500);
    }
}

// decline friend request
export const declineFriendRequest = async (req, res) => {
    try {
        const {requestId} = req.params;
        const userId = req.user._id;

        // check request exists
        const request = await FriendRequest.findById(requestId);
        if (!request) {
            return response.error(res, "Not found", "Request not found", 404);
        }

        // check if allowed
        if (request.to.toString() !== userId.toString()) {
            return response.error(res, "Forbidden", "Not allow to do this", 403);
        }

        await request.deleteOne();
        return response.success(res, {}, "Decline request successfully", 200);
    } catch (err) {
        console.log("Error when reject friend: ", err.message);
        return response.error(res, "System error", err.message, 500);
    }
}

// cancel friend request
export const cancelFriendRequest = async (req, res) => {
    try {
        const {requestId} = req.params;
        const userId = req.user._id;

        // check request exists
        const request = await FriendRequest.findById(requestId);
        if (!request) {
            return response.error(res, "Not found", "Request not found", 404);
        }

        // check if allowed
        if (request.from.toString() !== userId.toString()) {
            return response.error(res, "Forbidden", "Not allow to do this", 403);
        }

        await request.deleteOne();
        return response.success(res, {}, "Cancel request successfully", 200);
    } catch (err) {
        console.log("Error when reject friend: ", err.message);
        return response.error(res, "System error", err.message, 500);
    }
}

// get all friend requests
export const getFriendRequests = async (req, res) => {
    try {
        const userId = req.user._id;

        // separate sent and received requests
        const [sent, received] = await Promise.all([
            FriendRequest.find({
                from: userId,
            }).populate("to", "_id username displayName avatarUrl"),
            FriendRequest.find({
                to: userId,
            }).populate("from", "_id username displayName avatarUrl")
        ]);
        return response.success(res, {sent, received}, "Get friend requests successfully", 200);
    } catch (err) {
        console.log("Error when get friend requests: ", err.message);
        return response.error(res, "System error", err.message, 500);
    }
}

// get all friends
export const getFriends = async (req, res) => {
    try {
        const userId = req.user._id;

        // get friendship
        const friendShip = await Friend.find({
            $or: [
                {userA: userId,},
                {userB: userId,},
            ],
        })
        .populate("userA", "_id username displayName avatarUrl")
        .populate("userB", "_id username displayName avatarUrl")
        .lean();
        if (!friendShip.length) {
            return response.success(res, {friends: []}, "Get friends successfully", 200);
        }

        // get list of friends
        const friends = friendShip.map((f) => f.userA?._id.toString() === userId.toString()
            ? f.userB : f.userA
        );
        return response.success(res, {friends}, "Get friends successfully", 200);
    } catch (err) {
        console.log("Error when get friends: ", err.message);
        return response.error(res, "System error", err.message, 500);
    }
}