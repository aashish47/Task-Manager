import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "../api/api";
import { NotificationType } from "../types/notificationTypes";

const useNotificationsContext = () => {
    const { data: notifications } = useQuery<Array<NotificationType>>({ queryKey: ["Notifications"], queryFn: () => fetchNotifications() });
    return notifications;
};

export default useNotificationsContext;
