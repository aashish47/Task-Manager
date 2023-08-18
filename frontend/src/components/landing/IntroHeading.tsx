import { Box, Link, Typography, useMediaQuery, useTheme } from "@mui/material";

const IntroHeading = () => {
    const theme = useTheme();
    const isScreenMd = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Box maxWidth="sm" sx={{ m: { xs: 2, md: 5 } }}>
            <Typography variant="subtitle1" fontWeight={500} color="secondary">
                TRELLO 101
            </Typography>
            <Typography fontWeight={500} color="secondary" variant={isScreenMd ? "h5" : "h4"}>
                A productivity powerhouse
            </Typography>
            <Typography variant="h6" fontWeight={300} color="secondary" mt={2}>
                Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done.
                Learn more in our{" "}
                <Link underline="hover" href="#">
                    guide for getting started.
                </Link>
            </Typography>
        </Box>
    );
};

export default IntroHeading;
