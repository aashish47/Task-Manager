import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import useUpdateWorkspaceMutation from "../../hooks/workspace/useUpdateWorkspaceMutation";
import { WorkspaceType } from "../../types/workspaceTypes";
import WorkspaceAvatar from "./WorkspaceAvatar";

type WorkspaceDetailsBarProps = {
    workspace: WorkspaceType;
};

const WorkspaceDetailsBar: React.FC<WorkspaceDetailsBarProps> = ({ workspace }) => {
    const [open, setOpen] = React.useState(false);
    const { _id: workspaceId, name, description } = workspace;
    const [editName, setEditName] = useState(name);
    const [editDescription, setEditDescription] = useState(description);
    const updateWorkspaceMutation = useUpdateWorkspaceMutation();

    const handleClickOpen = () => {
        setEditName(name);
        setEditDescription(description);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        try {
            if (editName !== name || editDescription !== description) {
                const newWorkspace = { ...workspace, name: editName, description: editDescription };
                await updateWorkspaceMutation.mutateAsync({ workspaceId, newWorkspace });
            }
        } catch (error) {
            console.log(error);
        }
        handleClose();
    };
    return (
        <>
            <Stack alignItems="flex-start" direction="row">
                <Box sx={{ mr: 2, mb: 1 }}>
                    <WorkspaceAvatar wname={name} size={{ width: 56, height: 56 }} />
                </Box>
                <Typography variant="h6">{name}</Typography>
                <IconButton onClick={handleClickOpen} color="inherit">
                    <EditIcon fontSize="small" />
                </IconButton>
            </Stack>
            <Typography variant="caption">{description}</Typography>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle alignSelf="center">Edit Workspace</DialogTitle>
                <DialogContent>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                        autoComplete="o"
                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        multiline
                        minRows={3}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Description"
                        fullWidth
                        autoComplete="o"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default WorkspaceDetailsBar;
