import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import useUpdateBoardMembers from "../../hooks/board/useUpdateBoardMembers";
import { BoardType } from "../../types/boardTypes";
import UserAutocomplete from "../common/UserAutoComplete";

type BoardInviteProps = {
    board: BoardType;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BoardInvite: React.FC<BoardInviteProps> = ({ board, open, setOpen }) => {
    const [name, setName] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const updateBoardMembers = useUpdateBoardMembers();
    const { _id: boardId, members } = board;

    const handleButtonClick = async () => {
        const members = tags;

        try {
            await updateBoardMembers.mutateAsync({ boardId, members });
        } catch (error: any) {
            console.log("Error adding member", error.messaage);
        }
        handleClose();
    };

    const handleClose = () => {
        setTags([]);
        setName("");
        setOpen(false);
    };

    return (
        <Dialog fullWidth maxWidth="sm" disableRestoreFocus open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle>Share Board</DialogTitle>
            <form autoComplete="off">
                <DialogContent>
                    <UserAutocomplete members={members} tags={tags} setTags={setTags} name={name} setName={setName} />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleButtonClick}>Invite</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default BoardInvite;
