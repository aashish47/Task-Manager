import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import userService from "../services/userService";

export const getSender = async (user: DecodedIdToken | undefined) => {
    let sender = user?.name;
    if (user && !sender) {
        try {
            const response = await userService.getUserByUid(user.uid);
            if (!response) {
                throw Error("User doesn't exist");
            }

            sender = response.name;
        } catch (error) {
            throw Error;
        }
    }
    return sender;
};
