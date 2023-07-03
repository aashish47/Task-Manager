import { Toolbar, IconButton, Stack, Typography, ClickAwayListener, TextField, Button, Divider } from "@mui/material";
import AppBar from "./AppBar";
import BoardActions from "./BoardActions";
import InviteDialog from "./InviteDialog";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useUpdateBoardMutation from "../hooks/useUpdateBoardMutation";
import { BoardType } from "../types/boardTypes";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

type BoardAppBarProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    board: BoardType;
};

const BoardAppBar: React.FC<BoardAppBarProps> = ({ open, setOpen, board }) => {
    const { _id: boardId, name: boardName } = board;
    const theme = useTheme();
    const mode = theme.palette.mode;

    const [openInvite, setOpenInvite] = useState(false);
    const [editBName, setEditBName] = useState(false);
    const [inputBName, setInputBName] = useState(boardName);
    const updateBoardMutation = useUpdateBoardMutation();

    useEffect(() => {
        setInputBName(boardName);
    }, [boardName]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            handleClickAway();
        }
    };

    const handleClickAway = async () => {
        setEditBName(false);
        if (board && inputBName) {
            const newBoard = { ...board, name: inputBName };
            await updateBoardMutation.mutateAsync({ boardId, newBoard });
        }
    };

    return (
        <AppBar position="static" open={open}>
            <Toolbar>
                <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, ...(open && { display: "none" }) }}>
                    <MenuIcon />
                </IconButton>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
                    {!editBName ? (
                        <Typography
                            sx={{ "&:hover": { cursor: "pointer" }, p: "8.5px 14px" }}
                            onClick={() => setEditBName(true)}
                            variant="h6"
                            noWrap
                            component="div"
                        >
                            {inputBName}
                        </Typography>
                    ) : (
                        <ClickAwayListener onClickAway={handleClickAway}>
                            <TextField
                                sx={{ bgcolor: mode === "dark" ? "#22272b" : "#feff0026" }}
                                onFocus={(e) => e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)}
                                size="small"
                                inputProps={{ style: { fontWeight: 500, fontSize: "1.25rem" } }}
                                onKeyDown={handleKeyDown}
                                value={inputBName}
                                onChange={(e) => setInputBName(e.target.value)}
                                autoFocus
                                focused
                                variant="outlined"
                            />
                        </ClickAwayListener>
                    )}
                    <Stack direction="row" gap={1}>
                        <Button onClick={() => setOpenInvite(!openInvite)} color="secondary" variant="contained" startIcon={<PersonAddAltIcon />}>
                            Invite
                        </Button>
                        <InviteDialog boardId={boardId} open={openInvite} setOpen={setOpenInvite} />

                        <BoardActions boardId={boardId} />
                    </Stack>
                </Stack>
            </Toolbar>
            <Divider />
        </AppBar>
    );
};

export default BoardAppBar;
