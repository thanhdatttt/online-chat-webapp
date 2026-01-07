import {response} from "../utils/response.util.js";

export const addFriend = async (req, res) => {
    try {

    } catch (err) {
        console.log("Error when add friend: ", err.message);
        return response.error(res, "System error", err.message, 500);
    }
}