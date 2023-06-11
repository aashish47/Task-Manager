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
import useAuthContext from "../hooks/useAuthContext";
import { createBoard } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateBoard = ({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const workspaces = useWorkspaceData();
    const user = useAuthContext();

    const [name, setName] = React.useState("");
    const [workspace, setWorkspace] = React.useState("");

    const queryClient = useQueryClient();
    const createBoardMutation = useMutation({
        mutationFn: createBoard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Boards"] });
        },
    });

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(event.target.value);
    };

    const handleChangeWorkspace = (event: SelectChangeEvent) => {
        setWorkspace(event.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user) {
            const board = { name, workspaceId: workspace, createdBy: user.uid };
            try {
                await createBoardMutation.mutateAsync(board);
                handleClose();
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
        setWorkspace("");
        setName("");
    };

    return (
        <Dialog scroll="body" open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
            <DialogTitle align="center">Create Board</DialogTitle>

            <Divider variant="middle" />

            <div style={{ textAlign: "center", margin: "28px 0px 8px 0px" }}>
                <img src="http://localhost:5173/board.svg" alt="" />
            </div>

            <form autoComplete="off" onSubmit={handleSubmit}>
                <DialogContent sx={{ width: "350px" }}>
                    <TextField value={name} onChange={handleChangeName} required id="Board Name" label="Board Name" fullWidth sx={{ mb: 2 }} />

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
                                workspaces.map((workspace) => (
                                    <MenuItem key={workspace._id} value={workspace._id}>
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
