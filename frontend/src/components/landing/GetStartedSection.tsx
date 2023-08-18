import { Button, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";

const GetStartedSection = () => {
    const theme = useTheme();
    const isScreenMd = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Stack py={10} px={2} sx={{ backgroundImage: "linear-gradient(60deg, #5343aa 0%, #ed50b4 100%)", alignItems: { xs: "stretch", sm: "center" } }}>
            <Stack gap={2}>
                <Typography textAlign="center" sx={{ color: "white", px: { xs: 0, md: 5 } }} fontWeight={500} variant={isScreenMd ? "h5" : "h4"}>
                    Get started with Trello today
                </Typography>
                <Stack flexWrap="wrap" gap={2} direction="row">
                    <TextField
                        InputProps={{ sx: { color: "black" } }}
                        fullWidth
                        placeholder="Email"
                        variant="outlined"
                        sx={{
                            width: { sm: "100%", md: "60%" },
                            borderRadius: "4px",
                            display: { xs: "none", sm: "inherit" },
                            backgroundColor: "white",
                        }}
                    />

                    <Button sx={{ width: { xs: "100%", sm: "auto" } }} size="large" variant="contained">
                        sign up - it's free!
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default GetStartedSection;
