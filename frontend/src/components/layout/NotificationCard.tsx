import { Avatar, Card, CardContent, CardHeader, Divider, Link } from "@mui/material";
import { red } from "@mui/material/colors";
import { NavLink } from "react-router-dom";
import { NotificationType } from "../../types/notificationTypes";

type NotificationCardProps = {
    notification: NotificationType;
};

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
    const { name, link, sender, type } = notification;
    return (
        <Card sx={{ width: "100%", mt: 2 }}>
            <CardHeader titleTypographyProps={{ variant: "subtitle1" }} sx={{ p: 1 }} title={name} />
            <Divider />
            <CardHeader
                titleTypographyProps={{ variant: "subtitle2" }}
                sx={{ p: 1 }}
                avatar={
                    <Avatar sx={{ width: "30px", height: "30px", fontSize: "15px", bgcolor: red[500] }} aria-label="recipe">
                        {sender.charAt(0)}
                    </Avatar>
                }
                title={sender}
            />

            <CardContent sx={{ p: 1, "&.MuiCardContent-root:last-child": { p: 1 } }}>
                {`${sender} added you to the ${type} `}
                <Link component={NavLink} to={link}>
                    {name}
                </Link>
            </CardContent>
        </Card>
    );
};

export default NotificationCard;
