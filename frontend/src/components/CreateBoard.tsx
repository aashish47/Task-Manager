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

const CreateBoard = ({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const handleClose = () => {
        setOpen(false);
        setWorkspace("");
    };
    const [workspace, setWorkspace] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setWorkspace(event.target.value as string);
    };

    return (
        <Dialog scroll="body" open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
            <DialogTitle align="center">Create Board</DialogTitle>
            <Divider variant="middle" />
            <div style={{ textAlign: "center", margin: "28px 0px 8px 0px" }}>
                <img src="board.svg" alt="" />
            </div>
            <form
                autoComplete="off"
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log("hello");
                }}
            >
                <DialogContent sx={{ width: "350px" }}>
                    <TextField required id="Board Name" label="Board Name" fullWidth sx={{ mb: 2 }} />

                    <FormControl fullWidth>
                        <InputLabel id="workspace-label">Workspace *</InputLabel>
                        <Select
                            required
                            sx={{ mb: 3 }}
                            labelId="workspace-label"
                            id="workspace-select"
                            value={workspace}
                            label="Workspace*"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
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
