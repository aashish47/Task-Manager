import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";

type TaskProps = {
    name: string;
    taskId: string;
    index: number;
};

const Task: React.FC<TaskProps> = ({ name, taskId, index }) => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    return (
        <Draggable draggableId={taskId} index={index}>
            {(provided) => (
                <Card
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    sx={{
                        bgcolor: mode === "dark" ? "#22272b" : "white",
                        mt: 2,
                        mr: 1,
                    }}
                >
                    <CardContent sx={{ p: 1, paddingBottom: "8px !important" }}>
                        <Typography>{name}</Typography>
                    </CardContent>
                </Card>
            )}
        </Draggable>
    );
};

export default Task;
