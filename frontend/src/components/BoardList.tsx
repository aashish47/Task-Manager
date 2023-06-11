import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef } from "react";
import useTasksContext from "../hooks/useTasksContext";
import ListTask from "./ListTask";
import AddTaskButton from "./AddTaskButton";
import EnterTaskTitle from "./EnterTaskTitle";

type BoardListProps = {
    name: string;
    listId: string;
};

const BoardList: React.FC<BoardListProps> = ({ listId, name }) => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const data = useTasksContext();
    const tasks = data ? data.filter((task) => task.listId === listId) : null;
    const [first, setFirst] = React.useState(true);
    const maxHeight = first ? "calc(100vh - 240px)" : "calc(100vh - 210px)";
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!first && containerRef.current) {
            const container = containerRef.current;
            const scrollHeight = container.scrollHeight;
            const scrollTop = container.scrollTop;
            const distance = scrollHeight - scrollTop;
            const startTime = performance.now();
            const duration = 1000; // Adjust the duration as per your preference (in milliseconds)

            const animateScroll = (timestamp: number) => {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const ease = easeOutCubic(progress);
                container.scrollTo(0, scrollTop + distance * ease);

                if (elapsed < duration) {
                    requestAnimationFrame(animateScroll);
                }
            };

            requestAnimationFrame(animateScroll);
        }
    }, [first]);

    // Easing function for smoother animation
    const easeOutCubic = (t: number) => {
        return 1 - Math.pow(1 - t, 3);
    };

    useEffect(() => {
        if (!first && tasks && tasks.length > 0 && containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [first, tasks]);

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
            <Box ref={containerRef} id="container" sx={{ overflowY: "auto", overflowX: "hidden", maxHeight }}>
                {tasks && tasks.map((task) => <ListTask key={task._id} name={task.name} />)}

                <Box sx={{ flexBasis: "300px", flexShrink: "0", mt: 2 }}>
                    <EnterTaskTitle first={first} setFirst={setFirst} listId={listId} />
                </Box>
            </Box>
            <Box sx={{ mt: 1, pr: 3 }}>
                <AddTaskButton first={first} setFirst={setFirst} />
            </Box>
        </Box>
    );
};

export default BoardList;
