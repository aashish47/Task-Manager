import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";
import useCreateBoardMutation from "../../hooks/board/useCreateBoardMutation";
import useAuthContext from "../../hooks/context/useAuthContext";
import useWorkspaceData from "../../hooks/workspace/useWorkspaceContext";
import { CreateBoardType } from "../../types/boardTypes";

type CreateBoardProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateBoard: React.FC<CreateBoardProps> = ({ open, setOpen }) => {
    const workspaces = useWorkspaceData();
    const user = useAuthContext();
    const createBoardMutation = useCreateBoardMutation();

    const [name, setName] = React.useState("");
    const [workspace, setWorkspace] = React.useState("");

    const navigate = useNavigate();

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(event.target.value);
    };

    const handleChangeWorkspace = (event: SelectChangeEvent) => {
        setWorkspace(event.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user) {
            const board: CreateBoardType = { name, workspaceId: workspace, createdBy: user.uid };
            try {
                const { _id } = await createBoardMutation.mutateAsync(board);
                navigate(`/b/${name}/${_id}`);
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
