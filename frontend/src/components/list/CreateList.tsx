import { Box } from "@mui/material";
import React from "react";
import AddListButton from "./AddListButton";
import EnterListTitle from "./EnterListTitle";

type CreateListProps = {
    boardId: string;
    workspaceId: string;
};

const CreateList: React.FC<CreateListProps> = ({ workspaceId, boardId }) => {
    const [first, setFirst] = React.useState(true);

    return (
        <Box sx={{ flexBasis: "300px", flexShrink: "0" }}>
            <EnterListTitle workspaceId={workspaceId} first={first} setFirst={setFirst} boardId={boardId} />
            <AddListButton first={first} setFirst={setFirst} />
        </Box>
    );
};

export default CreateList;
