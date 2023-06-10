import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import CreateTask from "./CreateTask";
import useTasksContext from "../hooks/useTasksContext";
import ListTask from "./ListTask";

type BoardListProps = {
    name: string;
    listId: string;
};

const BoardList: React.FC<BoardListProps> = ({ listId, name }) => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const data = useTasksContext();
    const tasks = data ? data.filter((task) => task.listId === listId) : null;

    return (
        <Box
            sx={{
                flexBasis: "300px",
                height: "fit-content",
                flexShrink: "0",
                p: 1,
                borderRadius: 2,
                bgcolor: mode === "dark" ? "#100901" : "#ededed",
            }}
        >
            <Typography variant="subtitle1">{name}</Typography>
            <Box sx={{ overflowY: "auto", overflowX: "hidden", maxHeight: "calc(100vh - 360px)" }}>
                {tasks && tasks.map((task) => <ListTask name={task.name} />)}
            </Box>
            <CreateTask listId={listId} />
        </Box>
    );
};

export default BoardList;
