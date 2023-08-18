import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const WorkflowsHeading = () => {
    const theme = useTheme();
    const isScreenMd = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Box maxWidth="sm" sx={{ mx: { xs: 2, md: 5 }, my: 8 }}>
            <Typography variant="subtitle1" fontWeight={500} color="secondary">
                TRELLO IN ACTION
            </Typography>
            <Typography fontWeight={500} color="secondary" variant={isScreenMd ? "h5" : "h4"}>
                Workflows for any project, big or small
            </Typography>
        </Box>
    );
};

export default WorkflowsHeading;
