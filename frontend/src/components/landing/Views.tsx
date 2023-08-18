import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import { Box, Button, Link, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const Views = () => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const isScreenMd = useMediaQuery(theme.breakpoints.down("md"));
    const views = [
        {
            title: "HIT DEADLINES EVERY TIME",
            body: "From weekly sprints to annual planning, Timeline view keeps all tasks on track. Quickly get a glimpse of what’s coming down the pipeline and identify any gaps that might impede your team’s progress.",
            image: "Timeline.png",
            link: "Learn more about Timeline view",
            icon: <LineStyleIcon sx={{ color: "rgb(135, 119, 217)" }} />,
        },
        {
            title: "STAY ON TOP OF TASKS",
            body: "Start each day without any surprises. Whether scheduling an editorial calendar or staying on top of to-dos, Calendar view is like a crystal ball giving you a clear vision of what work lies ahead.",
            image: "Calendar.png",
            link: "Learn more about Calendar view",
            icon: <CalendarMonthIcon sx={{ color: "rgb(0, 199, 229)" }} />,
        },
    ];
    return (
        <Stack
            alignItems="center"
            sx={{
                p: {
                    xs: 2,
                    md: 5,
                    backgroundImage: mode === "light" ? "linear-gradient(240deg, #00b8d9 0%, #0065ff 100%)" : undefined,
                },
            }}
        >
            <Stack position="relative" top="50px" gap={2} maxWidth="sm">
                <Typography sx={{ color: "#eceff1" }} fontWeight={500} variant={isScreenMd ? "h5" : "h4"} textAlign="center">
                    See work in a whole new way
                </Typography>
                <Typography sx={{ color: "#eceff1" }} variant="h6" fontWeight={300} textAlign="center">
                    View your team’s projects from every angle and bring a fresh perspective to the task at hand.
                </Typography>
                <Button
                    sx={{ "&:hover": { backgroundColor: grey[400] }, py: 2, alignSelf: "center", backgroundColor: "#eceff1", color: "#263238" }}
                    variant="contained"
                >
                    discover all the views
                </Button>
            </Stack>
            <Stack gap={7} position="relative" top="156px">
                {views.map((view, index) => (
                    <Stack
                        sx={{
                            background: mode === "dark" ? "#121212" : "white",
                            borderRadius: "0.5rem",
                            boxShadow: mode === "dark" ? "rgb(146 170 218 / 15%) 0px 0.5rem 1rem 0px;" : "rgba(9, 30, 66, 0.15) 0px 0.5rem 1rem 0px",
                        }}
                        p={5}
                        key={view.title}
                        width="100%"
                        gap={4}
                        justifyContent="space-between"
                        direction={index % 2 === 0 ? "row" : "row-reverse"}
                        flexWrap={isScreenMd ? "wrap" : "nowrap"}
                    >
                        <Box flexShrink={0} maxWidth={isScreenMd ? "100%" : "50%"}>
                            <img src={view.image} style={{ width: "100%" }} />
                        </Box>
                        <Stack maxWidth={isScreenMd ? "100%" : "50%"} gap={3}>
                            <Stack gap={2} direction="row">
                                {view.icon}
                                <Typography variant="subtitle1" fontWeight={500} color="secondary">
                                    {view.title}
                                </Typography>
                            </Stack>
                            <Typography variant="h6" fontWeight={300} color="secondary">
                                {view.body}
                            </Typography>
                            <Link typography="h6" fontWeight={300} href="#" underline="hover">
                                {view.link}
                            </Link>
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
};

export default Views;
