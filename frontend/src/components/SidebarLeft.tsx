import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GroupsIcon from "@mui/icons-material/Groups";
import useWorkspaceContext from "../hooks/useWorkspaceContext";
import useBoardsContext from "../hooks/useBoardsContext";

export default function NestedList() {
    const workspaces = useWorkspaceContext();
    const boards = useBoardsContext();
    const [open, setOpen] = React.useState<boolean[]>([]);

    React.useEffect(() => {
        const init = Array(workspaces?.length).fill(false) as boolean[];
        setOpen(init);
    }, [workspaces]);

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        setSelectedIndex(index);
    };

    const handleClick = (index: number) => {
        setOpen(
            open.map((o, i) => {
                if (i === index) {
                    return !o;
                } else {
                    return o;
                }
            })
        );
    };

    const handleClickBoards = (workspaceId: string) => {
        const data = boards.filter((board) => board.workspaceId === workspaceId);
        console.log(data, workspaceId);
    };

    return (
        <List
            sx={{ p: 0, display: { xs: "none", md: "block" }, width: "100%", maxWidth: 250, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Boards" />
            </ListItemButton>

            <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>
            <Divider component="li" sx={{ my: "10px" }} />

            <ListItemButton>
                <ListItemText primary="Workspaces" />
                <ListItemIcon sx={{ justifyContent: "flex-end" }}>
                    <AddSharpIcon />
                </ListItemIcon>
            </ListItemButton>

            {workspaces &&
                workspaces.map((workspace, index) => (
                    <div key={index}>
                        <ListItemButton onClick={() => handleClick(index)}>
                            <ListItemIcon>
                                <WorkspacesIcon />
                            </ListItemIcon>
                            <ListItemText primary={workspace.name} />
                            {open[index] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open[index]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding sx={{ fontWeight: "300", fontSize: "15px" }}>
                                <ListItemButton onClick={() => handleClickBoards(workspace._id)} sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <DashboardIcon />
                                    </ListItemIcon>

                                    <ListItemText disableTypography primary="Boards" />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <FavoriteBorderIcon />
                                    </ListItemIcon>
                                    <ListItemText disableTypography primary="Highlights" />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <GroupsIcon />
                                    </ListItemIcon>
                                    <ListItemText disableTypography primary="Memebers" />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <SettingsIcon />
                                    </ListItemIcon>
                                    <ListItemText disableTypography primary="Settings" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </div>
                ))}
        </List>
    );
}
