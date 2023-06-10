import { Box } from "@mui/material";
import React from "react";
import AddTaskButton from "./AddTaskButton";
import EnterTaskTitle from "./EnterTaskTitle";

type createTaskProps = {
    listId: string;
};

const CreateTask: React.FC<createTaskProps> = ({ listId }) => {
    const [first, setFirst] = React.useState(true);

    return (
        <Box sx={{ flexBasis: "300px", flexShrink: "0", mt: 3 }}>
            <EnterTaskTitle first={first} setFirst={setFirst} listId={listId} />
            <AddTaskButton first={first} setFirst={setFirst} />
        </Box>
    );
};

export default CreateTask;
