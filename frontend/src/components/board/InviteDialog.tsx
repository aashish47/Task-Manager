import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import useSendInvitationMutation from "../../hooks/board/useSendInvitation";
import UserAutocomplete from "../common/UserAutoComplete";

type InviteDialogProps = {
    boardId: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const InviteDialog: React.FC<InviteDialogProps> = ({ boardId, open, setOpen }) => {
    const [name, setName] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const sendInvitationMutation = useSendInvitationMutation();

    const handleButtonClick = async () => {
        const clients = tags;
        console.log(clients);
        try {
            await sendInvitationMutation.mutateAsync({ boardId, clients });
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
                    <UserAutocomplete tags={tags} setTags={setTags} name={name} setName={setName} />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleButtonClick}>Invite</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default InviteDialog;
