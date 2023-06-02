import { Button, Typography, TextField, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from "@mui/material";

import React from "react";

const CreateWorkspace = ({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const handleClose = () => setOpen(false);

    return (
        <Dialog scroll="body" open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
            <DialogTitle>
                Let's build a Workspace
                <div>
                    <Typography variant="subtitle1">Boost your productivity by making it easier for everyone to access boards in one location.</Typography>
                </div>
            </DialogTitle>
            <form
                autoComplete="off"
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log("hello");
                }}
            >
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
