import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

type DeleteDialogProps = {
    type: string;
    name: string;
    handleDelete: () => void;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteDialog: React.FC<DeleteDialogProps> = ({ type, name, handleDelete, open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        handleDelete();
        handleClose();
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Delete?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{`This is permanent and cannot be undone. Delete the ${type} ${name}?`}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteDialog;
