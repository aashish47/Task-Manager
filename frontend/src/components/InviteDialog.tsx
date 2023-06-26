import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import useSendInvitationMutation from "../hooks/useSendInvitation";
import UserAutocomplete from "./UserAutoComplete";

export default function InviteDialog({ boardId, open, setOpen }: { boardId: string; open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
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
        <Dialog disableRestoreFocus open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
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
}
