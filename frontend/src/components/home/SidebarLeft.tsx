import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CollapseList from "./CollpaseList";
import useAuthContext from "../../hooks/context/useAuthContext";
import { User } from "firebase/auth";

const SideBarLeft = () => {
    const navigate = useNavigate();
    const user = useAuthContext();
    const { displayName } = user as User;
    const [selectedIndex, setSelectedIndex] = React.useState("Home");

    /*
    currentTarget = Name of the Button
    index = currentTarget
    index is used to uniquely identiy the button for selecting 
    */

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const currentTarget = event.currentTarget.textContent;
        currentTarget ? setSelectedIndex(currentTarget) : "";
        if (currentTarget === "Home") {
            navigate("/");
        } else if (currentTarget === "Boards") {
            navigate(`/u/${displayName}/boards`);
        }
    };

    return (
        <List
            sx={{ p: 0, display: { xs: "none", md: "block" }, width: "100%", maxWidth: 250, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton selected={selectedIndex === "Home"} onClick={(event) => handleListItemClick(event)}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>

            <ListItemButton selected={selectedIndex === "Boards"} onClick={(event) => handleListItemClick(event)}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Boards" />
            </ListItemButton>

            <Divider component="li" sx={{ my: "10px" }} />

            <ListItemButton>
                <ListItemText primary="Workspaces" />
                <ListItemIcon sx={{ justifyContent: "flex-end" }}>
                    <AddSharpIcon />
                </ListItemIcon>
            </ListItemButton>

            <CollapseList selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
        </List>
    );
};

export default SideBarLeft;
