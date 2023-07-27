import DeleteIcon from "@mui/icons-material/Delete";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useDeleteBoardMutation from "../../hooks/board/useDeleteBoardMutation";

type BoardDeleteProps = {
    boardId: string;
};

const BoardDelete: React.FC<BoardDeleteProps> = ({ boardId }) => {
    const name = "Delete this board";
    const deleteBoardMutation = useDeleteBoardMutation();
    const navigate = useNavigate();
    const handleDeleteBoardClick = async () => {
        try {
            await deleteBoardMutation.mutateAsync({ boardId });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <ListItem key={name} disablePadding>
                <ListItemButton onClick={handleDeleteBoardClick}>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText secondary={name} />
                </ListItemButton>
            </ListItem>
        </div>
    );
};

export default BoardDelete;
