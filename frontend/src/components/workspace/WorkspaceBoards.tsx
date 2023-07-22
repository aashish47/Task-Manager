import { Card, CardContent, Link, Stack, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import useBoardsContext from "../../hooks/board/useBoardsContext";

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
                    boards.map((board) => {
                        const { _id, name } = board;
                        return (
                            <Link
                                sx={{
                                    transition: "transform 0.2s ease",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                    },
                                    width: { xs: "100%", sm: "47%", md: "31%", lg: "23%" },
                                }}
                                component={NavLink}
                                to={`/b/${name}/${_id}`}
                                key={_id}
                            >
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
