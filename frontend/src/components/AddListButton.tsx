import { Collapse, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type AddListButtonProp = {
    first: boolean;
    setFirst: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddListButton: React.FC<AddListButtonProp> = ({ first, setFirst }) => {
    return (
        <Collapse in={first}>
            <Button size="large" onClick={() => setFirst((prev) => !prev)} variant="contained" fullWidth startIcon={<AddIcon />}>
                Add a list
            </Button>
        </Collapse>
    );
};

export default AddListButton;
