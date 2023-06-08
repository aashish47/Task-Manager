import React from "react";
import useBoardsContext from "../hooks/useBoardsContext";
import { Card, CardContent, Link, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

type WorkspaceBoardsProps = {
    workspaceId: string;
};

const WorkspaceBoards: React.FC<WorkspaceBoardsProps> = ({ workspaceId }) => {
    const data = useBoardsContext();
    const boards = data ? data.filter((board) => board.workspaceId === workspaceId) : null;

    return (
        boards && (
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                {boards &&
                    boards.map((board, index) => {
                        const { _id, name } = board;
                        return (
                            <Link sx={{ width: { xs: "100%", sm: "47%", md: "31%", lg: "23%" } }} component={NavLink} to={`/b/${name}/${_id}`} key={index}>
                                <Card sx={{ height: 100 }}>
                                    <CardContent>
                                        <Typography variant="subtitle2">{board.name}</Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
            </Stack>
        )
    );
};

export default WorkspaceBoards;
