import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, List, ListItemButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import { useState } from "react";

const IntroList = () => {
    const theme = useTheme();
    const isScreenMd = useMediaQuery(theme.breakpoints.down("md"));

    const mode = theme.palette.mode;
    const [selectedIndex, setSelectedIndex] = useState(0);

    const carouselImages = ["Carousel_Image_Boards.png", "Carousel_Image_Lists.png", "Carousel_Image_Cards.png"];
    const listItems = [
        {
            title: "Boards",
            body: "Trello boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we didit!",
        },
        {
            title: "Lists",
            body: "The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your team’s needs. There’s no wrong way to Trello.",
        },
        {
            title: "Cards",
            body: "Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.",
        },
    ];

    const handleNext = () => {
        setSelectedIndex((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setSelectedIndex((prevActiveStep) => prevActiveStep - 1);
    };

    const listItemButtonStyles = {
        "&:hover": { background: "none" },
        "&.Mui-selected": {
            background: mode === "dark" ? "#121212" : "white",
            boxShadow: mode === "dark" ? "rgb(146 170 218 / 15%) 0px 0.5rem 1rem 0px" : "rgba(9, 30, 66, 0.15) 0px 0.5rem 1rem 0px",
            borderRadius: "0.3rem",

            "&::after": {
                backgroundColor: "rgb(0, 199, 229)",
                borderRadius: "0.3rem 0px 0px 0.3rem",
                bottom: "0px",
                content: '""',
                left: "0px",
                position: "absolute",
                top: "0px",
                width: "0.5rem",
            },

            "&:hover": {
                background: mode === "dark" ? "#121212" : "white",
            },
        },
    };

    const handleListItemClick = (index: number) => {
        setSelectedIndex(index);
    };
    return (
        <Stack
            gap={isScreenMd ? 2 : 0}
            sx={{
                backgroundImage: mode === "light" ? "linear-gradient(0deg, #cdf1ff 0%, #ffffff 100%)" : undefined,
                justifyContent: "space-between",
                p: { xs: 2, md: 5 },

                flexDirection: { xs: "column-reverse", md: "row" },
            }}
        >
            <MobileStepper
                variant="dots"
                steps={3}
                position="static"
                activeStep={selectedIndex}
                sx={{ maxWidth: "sm", width: "100%", display: { xs: "flex", md: "none" }, alignSelf: "center" }}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={selectedIndex === 2}>
                        Next
                        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={selectedIndex === 0}>
                        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
            <List sx={{ width: { xs: "100%", md: "30%" } }}>
                <Stack gap={2}>
                    {listItems.map((item, index) => (
                        <Box key={index} sx={{ display: { xs: index === selectedIndex ? "block" : "none", md: "block" } }}>
                            <ListItemButton
                                disableRipple
                                disableTouchRipple
                                sx={listItemButtonStyles}
                                selected={selectedIndex === index}
                                onClick={() => handleListItemClick(index)}
                            >
                                <Stack>
                                    <Typography color="secondary" fontWeight={500} variant="subtitle1">
                                        {item.title}
                                    </Typography>
                                    <Typography color="secondary">{item.body}</Typography>
                                </Stack>
                            </ListItemButton>
                        </Box>
                    ))}
                </Stack>
            </List>
            <Stack alignItems="flex-start" sx={{ width: { xs: "100%", md: "60%" } }}>
                <img src={carouselImages[selectedIndex]} style={{ objectFit: "contain", width: "100%" }} />
            </Stack>
        </Stack>
    );
};

export default IntroList;
