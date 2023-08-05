import DeleteIcon from "@mui/icons-material/Delete";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteBoardMutation from "../../hooks/board/useDeleteBoardMutation";
import DeleteDialog from "../common/DeleteDialog";

type BoardDeleteProps = {
    boardId: string;
    name: string;
};

const BoardDelete: React.FC<BoardDeleteProps> = ({ boardId, name }) => {
    const [open, setOpen] = useState(false);
    const listItem = "Delete this board";
    const deleteBoardMutation = useDeleteBoardMutation();
    const navigate = useNavigate();
    const handleDelete = async () => {
        try {
            await deleteBoardMutation.mutateAsync({ boardId });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <ListItem key={listItem} disablePadding>
                <ListItemButton onClick={() => setOpen(true)}>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText secondary={listItem} />
                </ListItemButton>
            </ListItem>
            <DeleteDialog type="board" name={name} handleDelete={handleDelete} open={open} setOpen={setOpen} />
        </div>
    );
};

export default BoardDelete;
