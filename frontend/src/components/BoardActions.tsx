import * as React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Container, IconButton } from "@mui/material";
import useDeleteBoardMutation from "../hooks/useDeleteBoardMutation";
import { useNavigate } from "react-router-dom";
import TaskCoverMenu from "./TaskCoverMenu";
import { BoardType } from "../types/boardTypes";
import BoardCoverMenu from "./BoardCoverMenu";

type BoardActionsProps = {
    board: BoardType;
};

const BoardActions: React.FC<BoardActionsProps> = ({ board }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const deleteBoardMutation = useDeleteBoardMutation();
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleDelete = async () => {
        // await deleteBoardMutation.mutateAsync({ boardId });
        navigate(`/`);
        handleClose();
    };

    const handleCover = async () => {
        // await deleteBoardMutation.mutateAsync({ boardId });
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                color="inherit"
            >
                <MoreHorizIcon />
            </IconButton>
            <Menu
                sx={{ top: "10px", left: "10px" }}
                slotProps={{ paper: { sx: { width: "350px", height: "100%" } } }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Container fixed>
                    <BoardCoverMenu board={board} />
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Container>
            </Menu>
        </div>
    );
};

export default BoardActions;
