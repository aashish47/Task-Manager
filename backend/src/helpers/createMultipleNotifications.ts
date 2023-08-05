import notificationService from "../services/notificationService";

export const createMultipleNotifications = async ({
    members,
    sender,
    id,
    name,
    type,
}: {
    members: string[];
    sender: string;
    id: string;
    name: string;
    type: string;
}) => {
    const link = `http://localhost:5173/${type === "workspace" ? "w" : "b"}/${name}/${id}`;
    try {
        for (const member of members) {
            await notificationService.createNotification({ uid: member, sender, link, name, type });
        }
    } catch (error: any) {
        return error;
    }
};
