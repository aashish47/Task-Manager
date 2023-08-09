import { Server } from "socket.io";
import Notification from "../models/Notification";
import notificationService from "../services/notificationService";

export = async (uid: string, io: Server) => {
    const notifications = await Notification.find({ uid, isPending: true });
    const totalNotifications = notifications.length;
    if (totalNotifications > 0) {
        io.to(uid).emit("notifications", totalNotifications);
        notifications.map((notification) => {
            const id = notification._id;
            notificationService.updateNotification(id, { isPending: false });
        });
    }
};
