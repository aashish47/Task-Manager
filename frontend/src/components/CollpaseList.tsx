import Collapse from "@mui/material/Collapse";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GroupsIcon from "@mui/icons-material/Groups";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { ListItemButton, ListItemIcon, ListItemText, List } from "@mui/material";
import useBoardsContext from "../hooks/useBoardsContext";
import useWorkspaceContext from "../hooks/useWorkspaceContext";
import { useNavigate } from "react-router-dom";
import React from "react";

const CollapseList = ({ selectedIndex, setSelectedIndex }: { selectedIndex: string; setSelectedIndex: React.Dispatch<React.SetStateAction<string>> }) => {
    const [open, setOpen] = React.useState<boolean[]>([]);
    const workspaces = useWorkspaceContext();
    const boards = useBoardsContext();

    const navigate = useNavigate();

    React.useEffect(() => {
        const init = Array(workspaces?.length).fill(false) as boolean[];
        setOpen(init);
    }, [workspaces]);

    const handleWorkspaceClick = (index: number) => {
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
    const handleClickBoards = (workspaceId: string | undefined, workspaceName: string | undefined) => {
        const data = boards.filter((board) => board.workspaceId === workspaceId);
        console.log(data, workspaceId);
        navigate(`/w/${workspaceName}/${workspaceId}/home`);
    };

    /*
    currentTarget = Name of the Button
    index = workspaceIdcurrentTarget
    index is used to uniquely identiy the button for selecting 
    */

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, workspaceId: string, workspaceName: string) => {
        const currentTarget = event.currentTarget.textContent;
        const index = `${workspaceId}${currentTarget}`;
        setSelectedIndex(index);
        console.log(index);

        if (currentTarget === "Boards") {
            handleClickBoards(workspaceId, workspaceName);
        } else if (currentTarget === "Highlights") {
            console.log();
        } else if (currentTarget === "Members") {
            console.log();
        } else if (currentTarget === "Settings") {
            console.log();
        }
    };

    return (
        <div>
            {workspaces &&
                workspaces.map((workspace, index) => {
                    const { _id: workspaceId, name: workspaceName } = workspace;

                    return (
                        <div key={index}>
                            <ListItemButton onClick={() => handleWorkspaceClick(index)}>
                                <ListItemIcon>
                                    <WorkspacesIcon />
                                </ListItemIcon>
                                <ListItemText primary={workspaceName} />
                                {open[index] ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding sx={{ fontWeight: "300", fontSize: "15px" }}>
                                    <ListItemButton
                                        selected={selectedIndex === `${workspaceId}Boards`}
                                        onClick={(event) => handleListItemClick(event, workspaceId, workspaceName)}
                                        sx={{ pl: 4 }}
                                    >
                                        <ListItemIcon>
                                            <DashboardIcon />
                                        </ListItemIcon>

                                        <ListItemText disableTypography primary="Boards" />
                                    </ListItemButton>
                                    <ListItemButton
                                        selected={selectedIndex === `${workspaceId}Highlights`}
                                        onClick={(event) => handleListItemClick(event, workspaceId, workspaceName)}
                                        sx={{ pl: 4 }}
                                    >
                                        <ListItemIcon>
                                            <FavoriteBorderIcon />
                                        </ListItemIcon>
                                        <ListItemText disableTypography primary="Highlights" />
                                    </ListItemButton>
                                    <ListItemButton
                                        selected={selectedIndex === `${workspaceId}Members`}
                                        onClick={(event) => handleListItemClick(event, workspaceId, workspaceName)}
                                        sx={{ pl: 4 }}
                                    >
                                        <ListItemIcon>
                                            <GroupsIcon />
                                        </ListItemIcon>
                                        <ListItemText disableTypography primary="Members" />
                                    </ListItemButton>
                                    <ListItemButton
                                        selected={selectedIndex === `${workspaceId}Settings`}
                                        onClick={(event) => handleListItemClick(event, workspaceId, workspaceName)}
                                        sx={{ pl: 4 }}
                                    >
                                        <ListItemIcon>
                                            <SettingsIcon />
                                        </ListItemIcon>
                                        <ListItemText disableTypography primary="Settings" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </div>
                    );
                })}
        </div>
    );
};

export default CollapseList;
