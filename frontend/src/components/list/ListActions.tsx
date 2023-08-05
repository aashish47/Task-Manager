import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Container, IconButton, Stack, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import useDeleteListMutation from "../../hooks/list/useDeleteListMutation";
import DeleteDialog from "../common/DeleteDialog";

type ListActionsProps = {
    boardId: string;
    listId: string;
    name: string;
};

const ListActions: React.FC<ListActionsProps> = ({ boardId, listId, name }) => {
    const [openDelete, setOpenDelete] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const deleteListMutation = useDeleteListMutation();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleDelete = async () => {
        try {
            await deleteListMutation.mutateAsync({ boardId, listId });
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                color="inherit"
            >
                <MoreHorizIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{ paper: { sx: { width: "300px" } } }}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Container fixed>
                    <Stack alignItems="center" direction="row">
                        <Typography sx={{ flexGrow: 2, textAlign: "center" }}>List Actions</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </Container>
                <MenuItem>Sort by</MenuItem>
                <MenuItem onClick={() => setOpenDelete(true)}>Delete</MenuItem>
            </Menu>
            <DeleteDialog type="list" name={name} handleDelete={handleDelete} open={openDelete} setOpen={setOpenDelete} />
        </div>
    );
};

export default ListActions;
