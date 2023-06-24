import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "../api/api";

export type NotificationType = {
    uid: string;
    sender: string;
    boardName: string;
    boardLink: string;
    isRead: boolean;
    isPending: boolean;
    updatedAt: string;
    __v: number;
    _id: string;
};

const useNotificationsContext = () => {
    const { data: notifications } = useQuery<Array<NotificationType>>({ queryKey: ["Notifications"], queryFn: () => fetchNotifications() });

    return notifications;
};

export default useNotificationsContext;
