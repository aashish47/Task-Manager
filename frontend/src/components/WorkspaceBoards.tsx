import React from "react";
import useBoardsContext from "../hooks/useBoardsContext";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Card, CardContent, Stack, Typography } from "@mui/material";

type WorkspaceBoardsProps = {
    workspaceId: string;
};

const WorkspaceBoards: React.FC<WorkspaceBoardsProps> = ({ workspaceId }) => {
    const data = useBoardsContext();
    const boards = data ? data.filter((board) => board.workspaceId === workspaceId) : null;

    return (
        <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <PersonOutlineIcon fontSize="large" />
                <Typography variant="h6">Your Boards</Typography>
            </Stack>
            {boards && (
                <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                    {boards.map((board, index) => (
                        <Card key={index} raised sx={{ width: { xs: "100%", sm: "47%", md: "31%", lg: "23%" }, height: 100 }}>
                            <CardContent>
                                <Typography variant="subtitle2">{board.name}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            )}
        </Stack>
    );
};

export default WorkspaceBoards;
