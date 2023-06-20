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

export default function InviteDialog({ boardId, open, setOpen }: { boardId: string; open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [name, setName] = useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(event.target.value);
    };

    const handleButtonClick = () => {
        const clientId = name;
        sendInvitation({ boardId, clientId });
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
