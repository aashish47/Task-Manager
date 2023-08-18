import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const FeaturesHeading = () => {
    const theme = useTheme();
    const isScreenMd = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Box maxWidth="sm" sx={{ mx: { xs: 2, md: 5 }, mt: 25 }}>
            <Typography variant="subtitle1" fontWeight={500} color="secondary">
                POWERFUL WAYS TO GROW
            </Typography>
            <Typography fontWeight={500} color="secondary" variant={isScreenMd ? "h5" : "h4"}>
                Do more with Trello
            </Typography>
            <Typography variant="h6" fontWeight={300} color="secondary" mt={2}>
                Trello’s intuitive features give any team the ability to quickly set up and customize workflows for just about anything.
            </Typography>
        </Box>
    );
};

export default FeaturesHeading;
