import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Divider,
} from "@mui/material";

import React from "react";
import useWorkspaceData from "../hooks/useWorkspaceContext";

const CreateBoard = ({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [board, setBoard] = React.useState("");
    const [workspace, setWorkspace] = React.useState("");

    const logMessage = `Workspace: ${workspace}, Board: ${board}`;
    console.log(logMessage);

    const handleChangeBoard = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBoard(event.target.value);
    };

    const handleChangeWorkspace = (event: SelectChangeEvent) => {
        setWorkspace(event.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleClose = () => {
        setOpen(false);
        setWorkspace("");
        setBoard("");
    };

    const workspaces = useWorkspaceData();
    console.log(workspaces);

    return (
        <Dialog scroll="body" open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
            <DialogTitle align="center">Create Board</DialogTitle>

            <Divider variant="middle" />

            <div style={{ textAlign: "center", margin: "28px 0px 8px 0px" }}>
                <img src="board.svg" alt="" />
            </div>

            <form autoComplete="off" onSubmit={handleSubmit}>
                <DialogContent sx={{ width: "350px" }}>
                    <TextField value={board} onChange={handleChangeBoard} required id="Board Name" label="Board Name" fullWidth sx={{ mb: 2 }} />

                    <FormControl fullWidth>
                        <InputLabel id="workspace-label">Workspace *</InputLabel>
                        <Select
                            required
                            sx={{ mb: 3 }}
                            labelId="workspace-label"
                            id="workspace-select"
                            value={workspace}
                            label="Workspace*"
                            onChange={handleChangeWorkspace}
                        >
                            {workspaces &&
                                workspaces.map((workspace, index) => (
                                    <MenuItem key={index} value={workspace.name}>
                                        {workspace.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>

                    <DialogActions>
                        <Button type="submit" fullWidth variant="contained">
                            Create
                        </Button>
                    </DialogActions>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default CreateBoard;
