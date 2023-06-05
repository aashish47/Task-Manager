import React from "react";
import useBoardsContext from "../hooks/useBoardsContext";

type WorkspaceBoardsProps = {
    workspaceId: string;
};

const WorkspaceBoards: React.FC<WorkspaceBoardsProps> = ({ workspaceId }) => {
    const data = useBoardsContext();
    const boards = data ? data.filter((board) => board.workspaceId === workspaceId) : null;

    return (
        boards && (
            <ul>
                {boards.map((board, index) => (
                    <li key={index}>{board.name}</li>
                ))}
            </ul>
        )
    );
};

export default WorkspaceBoards;
