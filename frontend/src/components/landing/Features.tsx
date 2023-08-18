import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const Features = () => {
    const theme = useTheme();
    const mode = theme.palette.mode;

    const features = [
        {
            title: "Integrations",
            body: "Connect the apps your team already uses into your Trello workflow or add a Power-Up to fine-tune your specific needs.",
            image: "Integrations.svg",
            button: "browse integrations",
        },
        {
            title: "Butler Automation",
            body: "No-code automation is built into every Trello board. Focus on the work that matters most and let the robots do the rest.",
            image: "Gears.svg",
            button: "get to know automation",
        },
        {
            title: "Trello Enterprise",
            body: "The productivity tool teams love, paired with the features and security needed for scale.",
            image: "Search.svg",
            button: "explore enterprise",
        },
    ];

    return (
        <Stack sx={{ m: { xs: 2, md: 5 } }} justifyContent="space-between" direction="row" flexWrap="wrap">
            {features.map((feature) => (
                <Stack
                    bgcolor={mode === "light" ? grey[50] : "#121212"}
                    p={2}
                    mb={2}
                    justifyContent="space-between"
                    gap={5}
                    key={feature.title}
                    minWidth="260px"
                    sx={{
                        maxWidth: { xs: "100%", sm: "49%", md: "32%" },
                        boxShadow: mode === "dark" ? "rgb(146 170 218 / 15%) 0px 0.5rem 1rem 0px" : undefined,
                    }}
                >
                    <Box maxWidth="30%">
                        <img src={feature.image} style={{ width: "100%", background: mode === "dark" ? "#0f0f0f" : undefined }} />
                    </Box>
                    <Typography color="secondary" fontWeight={500} variant="h6">
                        {feature.title}
                    </Typography>
                    <Typography color="secondary">{feature.body}</Typography>
                    <Button sx={{ py: 2, alignSelf: "flex-start", mt: 2 }} variant="outlined">
                        {feature.button}
                    </Button>
                </Stack>
            ))}
        </Stack>
    );
};

export default Features;
