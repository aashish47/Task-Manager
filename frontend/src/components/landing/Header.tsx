import { Button, Grid, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";

const Header = () => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const isScreenMd = useMediaQuery(theme.breakpoints.down("md"));
    const wave = mode === "dark" ? "wave-dark.svg" : "wave-light.svg";

    return (
        <Grid container position="relative" sx={{ pt: 5, backgroundImage: "linear-gradient(60deg, #5343aa 0%, #ed50b4 100%)" }} gap={5} justifyContent="center">
            <Grid display="flex" flexDirection="column" gap={4} sx={{ height: "80%", textAlign: { xs: "center", md: "start" } }} xs={11} sm={7} md={5}>
                <Typography sx={{ color: "white" }} fontWeight={500} variant={isScreenMd ? "h4" : "h3"}>
                    Trello brings all your tasks, teammates, and tools together
                </Typography>

                <Typography sx={{ color: "white" }} fontWeight={400} variant="h6">
                    Keep everything in the same place—even if your team isn’t.
                </Typography>

                <Stack zIndex={1} flexWrap="wrap" gap={2} direction="row">
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
            </Grid>
            <Grid xs={11} sm={7} md={6} sx={{ zIndex: 1, textAlign: "center" }}>
                <img src="header-image.png" style={{ width: "100%" }} />
            </Grid>
            <img src={wave} style={{ position: "absolute", bottom: -1, width: "100%" }} />
        </Grid>
    );
};

export default Header;
