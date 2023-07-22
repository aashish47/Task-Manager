import { Collapse, Button, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type AddListButtonProps = {
    first: boolean;
    setFirst: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddListButton: React.FC<AddListButtonProps> = ({ first, setFirst }) => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    return (
        <Collapse in={first}>
            <Button
                sx={{ backgroundColor: mode === "dark" ? "rgb(255 255 255 / 10%)" : "rgb(0 0 0 / 10%)" }}
                size="large"
                onClick={() => setFirst((prev) => !prev)}
                variant="contained"
                fullWidth
                startIcon={<AddIcon />}
            >
                Add a list
            </Button>
        </Collapse>
    );
};

export default AddListButton;
