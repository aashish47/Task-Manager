import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import { sendInvitation } from "../api/api";
import useUpdateBoardMutation from "../hooks/useUpdateBoardMutation";
import { BoardType } from "../hooks/useBoardsContext";
import useSendInvitationMutation from "../hooks/useSendInvitation";

export default function InviteDialog({ boardId, open, setOpen }: { boardId: string; open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [name, setName] = useState("");
    const sendInvitationMutation = useSendInvitationMutation();
    const updateBoardMutation = useUpdateBoardMutation();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(event.target.value);
    };

    const handleButtonClick = async () => {
        const clientId = name;
        try {
            await sendInvitationMutation.mutateAsync({ boardId, clientId });
        } catch (error: any) {
            console.log("Error adding member", error.messaage);
        }
        handleClose();
    };

    const handleClose = () => {
        setName("");
        setOpen(false);
    };

    return (
        <Dialog disableRestoreFocus open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle>Share Board</DialogTitle>
            <form autoComplete="off">
                <DialogContent>
                    <TextField
                        value={name}
                        onChange={handleChange}
                        autoComplete="off"
                        autoFocus
                        sx={{ maxWidth: 500, width: "70vw" }}
                        placeholder="Email address or name "
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleButtonClick}>Invite</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
