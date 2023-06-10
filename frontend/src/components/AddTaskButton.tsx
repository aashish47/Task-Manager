import { Collapse, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type AddTaskButtonProp = {
    first: boolean;
    setFirst: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddTaskButton: React.FC<AddTaskButtonProp> = ({ first, setFirst }) => {
    return (
        <Collapse in={first}>
            <Button
                sx={{ justifyContent: "flex-start" }}
                size="small"
                onClick={() => setFirst((prev) => !prev)}
                variant="text"
                fullWidth
                startIcon={<AddIcon />}
            >
                Add a task
            </Button>
        </Collapse>
    );
};

export default AddTaskButton;
