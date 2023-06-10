import { Box } from "@mui/material";
import React from "react";
import AddListButton from "./AddListButton";
import EnterListTitle from "./EnterListTitle";

type createListProps = {
    boardId: string;
};

const CreateList: React.FC<createListProps> = ({ boardId }) => {
    const [first, setFirst] = React.useState(true);

    return (
        <Box sx={{ flexBasis: "300px", flexShrink: "0" }}>
            <EnterListTitle first={first} setFirst={setFirst} boardId={boardId} />
            <AddListButton first={first} setFirst={setFirst} />
        </Box>
    );
};

export default CreateList;
