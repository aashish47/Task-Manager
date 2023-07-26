import { connected, io } from "../app";
import notificationService from "../services/notificationService";

export const sendMultipleNotifications = async (members: string[]) => {
    try {
        for (const member of members) {
            console.log(member, connected);
            if (connected.has(member)) {
                io.to(member).emit("notifications", 1);
                await notificationService.updateNotificationByUid(member, { pending: false });
            }
        }
    } catch (error) {
        return error;
    }
};
