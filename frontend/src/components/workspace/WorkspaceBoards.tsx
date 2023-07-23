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
                        const { _id, name, coverUrls } = board;
                        const { regular } = coverUrls;
                        return (
                            <Link
                                sx={{
                                    transition: "transform 0.2s ease",
                                    "&:hover": {
                                        boxShadow: "0 0 10px 5px",
                                    },
                                    width: { xs: "100%", sm: "47%", md: "31%", lg: "23%" },
                                }}
                                component={NavLink}
                                to={`/b/${name}/${_id}`}
                                key={_id}
                            >
                                <Card sx={{ height: 100, backgroundImage: `url(${regular})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                                    <CardContent>
                                        <Typography sx={{ color: "white" }} variant="body1" fontWeight={700}>
                                            {name}
                                        </Typography>
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
