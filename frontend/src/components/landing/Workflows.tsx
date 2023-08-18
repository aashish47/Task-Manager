import { Box, Container, Stack, Typography, useTheme } from "@mui/material";

const Workflows = () => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const workflows = [
        {
            title: "Project management",
            body: "Keep tasks in order,deadlines on track, and team members aligned with trello",
            icon: "icon-folder.png",
            color: "rgb(255, 116, 82)",
        },
        {
            title: "Meetings",
            body: "Empower your team meetings to be more productive, empowering, and dare we say—fun.",
            icon: "icon-megaphone.png",
            color: "rgb(38, 132, 255)",
        },
        {
            title: "Onboarding",
            body: "Onboarding to a new company or project is a snap with Trello’s visual layout of to-do’s, resources, and progress tracking.",
            icon: "icon-leaf.png",
            color: "rgb(87, 217, 163)",
        },
        {
            title: "Task management",
            body: "Use Trello to track, manage, complete, and bring tasks together like the pieces of a puzzle, and make your team’s projects a cohesive success every time.",
            icon: "icon-checklists.png",
            color: "rgb(255, 196, 0)",
        },
        {
            title: "Brainstorming",
            body: "Unleash your team’s creativity and keep ideas visible, collaborative, and actionable.",
            icon: "icon-brainstorming.svg",
            color: "rgb(0, 199, 229)",
        },
        {
            title: "Resource hub",
            body: "Save time with a well-designed hub that helps teams find information easily and quickly.",
            icon: "icon-book.png",
            color: "rgb(249, 156, 219)",
        },
    ];
    return (
        <Stack sx={{ py: 5, px: 2, m: { xs: 2, md: 5 }, overflow: "auto", maxWidth: "100vw" }} direction="row" gap={2}>
            {workflows.map((workflow) => (
                <Box
                    sx={{
                        overflow: "hidden",
                        borderRadius: "0.5rem",
                        boxShadow: mode === "dark" ? "rgb(146 170 218 / 15%) 0px 0.5rem 1rem 0px;" : "rgba(9, 30, 66, 0.15) 0px 0.5rem 1rem 0px",
                        "&:hover": {
                            boxShadow: mode === "dark" ? "rgb(146 170 218 / 35%) 0px 0.5rem 1rem 0px;" : "rgba(9, 30, 66, 0.35) 0px 0.5rem 1rem 0px",
                            cursor: "pointer",
                        },
                    }}
                    minWidth="400px"
                    minHeight="220px"
                >
                    <Stack>
                        <Box sx={{ position: "relative", bgcolor: workflow.color, width: "100%", height: "30px" }}>
                            <Box
                                sx={{
                                    backgroundColor: "rgb(255, 255, 255)",
                                    backgroundImage: `url(${workflow.icon})`,
                                    backgroundPosition: "center center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "contain",
                                    borderColor: "rgb(255, 255, 255)",
                                    borderRadius: "0.5rem",
                                    borderStyle: "solid",
                                    borderWidth: "8px",
                                    height: "3rem",
                                    left: "1rem",
                                    position: "absolute",
                                    top: "0.5rem",
                                    width: "3rem",
                                }}
                            />
                        </Box>

                        <Container sx={{ mt: 5 }}>
                            <Typography color="secondary" fontWeight={500} variant="h6">
                                {workflow.title}
                            </Typography>
                            <Typography color="secondary">{workflow.body}</Typography>
                        </Container>
                    </Stack>
                </Box>
            ))}
        </Stack>
    );
};

export default Workflows;
