import { Button, Typography, TextField, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from "@mui/material";
import React, { useState } from "react";
import useAuthContext from "../../hooks/context/useAuthContext";
import useCreateWorkspaceMutation from "../../hooks/workspace/useCreateWorkspaceMutation";
import { CreateWorkspaceType } from "../../types/workspaceTypes";

type CreateWorkspaeProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateWorkspace: React.FC<CreateWorkspaeProps> = ({ open, setOpen }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const createWorkspaceMutation = useCreateWorkspaceMutation();
    const user = useAuthContext();

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(event.target.value);
    };

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user) {
            const workspace: CreateWorkspaceType = { name, description, createdBy: user.uid };
            try {
                await createWorkspaceMutation.mutateAsync(workspace);
                handleClose();
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
        setName("");
        setDescription("");
    };

    return (
        <Dialog scroll="body" open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
            <DialogTitle>
                Let's build a Workspace
                <Typography component={"div"} variant="subtitle1">
                    Boost your productivity by making it easier for everyone to access boards in one location.
                </Typography>
            </DialogTitle>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        id="Workspace Name"
                        label="Workspace Name"
                        placeholder="Taco's Co"
                        fullWidth
                        value={name}
                        onChange={handleChangeName}
                        sx={{ mt: "35px", mb: "8px" }}
                    />
                    <DialogContentText variant="caption">This is the name of your company, team or organization.</DialogContentText>
                    <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        multiline
                        minRows={4}
                        id="Workspace Description"
                        label="Workspace Description"
                        placeholder="Our team organizes everything here."
                        value={description}
                        onChange={handleChangeDescription}
                        sx={{ mt: "35px" }}
                    />
                    <DialogContentText variant="caption">Get your members on board with a few words about your Workspace.</DialogContentText>
                    <DialogActions>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: "35px" }}>
                            Continue
                        </Button>
                    </DialogActions>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default CreateWorkspace;
