import Notification from "../models/Notification";

const createNotification = async (newNotification: object) => {
    const notification = new Notification(newNotification);
    return await notification.save();
};

const deleteNotification = async (id: string) => {
    return await Notification.findByIdAndDelete(id);
};

const getAllNotifications = async (createdBy: string) => {
    return await Notification.find({ createdBy });
};

const updateNotification = async (id: string, updaterQuery: object) => {
    return await Notification.findByIdAndUpdate(id, updaterQuery, { new: true });
};

const getNotificationById = async (id: string) => {
    return await Notification.findById(id);
};

export default {
    createNotification,
    deleteNotification,
    getAllNotifications,
    updateNotification,
    getNotificationById,
};
