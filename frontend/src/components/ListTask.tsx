import { Card, CardContent, Typography, useTheme } from "@mui/material";

type ListTaskProps = {
    name: string;
};

const ListTask: React.FC<ListTaskProps> = ({ name }) => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    return (
        <Card
            sx={{
                bgcolor: mode === "dark" ? "#22272b" : "white",
                mt: 2,
                mr: 1,
                "&:hover": {
                    transform: "none",
                },
            }}
        >
            <CardContent sx={{ px: 2, paddingBottom: "8px !important" }}>
                <Typography>{name}</Typography>
            </CardContent>
        </Card>
    );
};

export default ListTask;
