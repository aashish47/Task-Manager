import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

const Companies = () => {
    const theme = useTheme();
    const isScreenMd = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Stack alignItems="center" p={{ xs: 2, md: 5 }}>
            <Stack gap={4} alignItems="center">
                <Typography textAlign="center" variant="h6" fontWeight={300} color="secondary" mt={2}>
                    Join over 2,000,000 teams worldwide that are using Trello to get more done.
                </Typography>
                <Box sx={{ width: { xs: "70%", md: "100%" } }}>
                    <img src={isScreenMd ? "logos-vertical.svg" : "logos-horizontal.svg"} style={{ width: "100%" }} />
                </Box>
            </Stack>
        </Stack>
    );
};

export default Companies;
