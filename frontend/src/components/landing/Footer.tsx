import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Divider, Link, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Logo from "../layout/Logo";
const Footer = () => {
    const theme = useTheme();
    const isScreenMd = useMediaQuery(theme.breakpoints.down("md"));
    const footer1 = [
        { title: "About Trello", subtitle: "What's behind the boards." },
        { title: "Jobs", subtitle: "Learn about the open roles on Trello team." },
        { title: "Apps", subtitle: "Download the Trello App for your Desktop or Mobile devices." },
        { title: "Contact us", subtitle: "Need anything? Get in touch and we can help." },
    ];
    const footer2 = ["Privacy Policy", "Notice at Collection", "Terms", "Copyright © 2023 Atlassian"];
    const footerIcons = [
        <InstagramIcon fontSize="small" />,
        <FacebookIcon fontSize="small" />,
        <LinkedInIcon fontSize="small" />,
        <TwitterIcon fontSize="small" />,
        <YouTubeIcon fontSize="small" />,
    ];
    return (
        <Stack sx={{ px: { xs: 2, md: 5 }, background: "rgb(23, 43, 77)" }}>
            <Stack my={3} sx={{ flexDirection: isScreenMd ? "column" : "row" }}>
                <Stack
                    justifyContent="space-between"
                    sx={{ flexDirection: { xs: "row", md: "column" }, width: { xs: "100%", md: "20%" }, pb: { xs: 2, md: 0 } }}
                >
                    <Link href="#">
                        <Logo color={"#eceff1"} />
                    </Link>
                    <Link underline="hover" href="#" sx={{ color: "#eceff1" }}>
                        <Typography variant={isScreenMd ? "subtitle1" : "caption"} sx={{ color: "#eceff1" }}>
                            Log In
                        </Typography>
                    </Link>
                </Stack>
                <Divider sx={{ display: { xs: "block", md: "none" }, borderColor: "rgba(255, 255, 255, 0.12)" }} />
                {footer1.map((footer) => (
                    <Stack pr={1} key={footer.title} sx={{ "&:hover": { cursor: "pointer" }, width: { xs: "100%", md: "20%" } }}>
                        <Link underline="hover" sx={{ py: { xs: 2, md: 0 }, color: "#eceff1" }}>
                            <Typography fontWeight={500} sx={{ color: "#eceff1" }}>
                                {footer.title}
                            </Typography>
                            <Typography sx={{ color: "#eceff1" }} variant="caption">
                                {footer.subtitle}
                            </Typography>
                        </Link>
                        <Divider sx={{ display: { xs: "block", md: "none" }, borderColor: "rgba(255, 255, 255, 0.12)" }} />
                    </Stack>
                ))}
            </Stack>
            <Divider sx={{ display: { xs: "none", md: "block" }, borderColor: "rgba(255, 255, 255, 0.12)" }} />
            <Stack my={2} gap={isScreenMd ? 0.5 : 0} sx={{ flexDirection: isScreenMd ? "column" : "row" }}>
                <Typography sx={{ color: "#eceff1" }} width="20%">
                    English
                </Typography>
                {footer2.map((footer) => (
                    <Link href="#" underline="hover" sx={{ flexShrink: 0, color: "#eceff1" }}>
                        <Typography pr={2} key={footer} variant="caption" sx={{ color: "#eceff1" }}>
                            {footer}
                        </Typography>
                    </Link>
                ))}
                <Box flexGrow={1} />
                <Stack direction="row" sx={{ py: { xs: 2, md: 0 }, justifyContent: { xs: "center", md: "normal" } }}>
                    {footerIcons.map((icon, index) => (
                        <Stack
                            direction="row"
                            sx={{
                                "&:hover": { cursor: "pointer" },
                                flexShrink: 0,
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#eceff1",
                                mx: 2,
                                borderRadius: "50%",
                                height: "30px",
                                width: "30px",
                                border: "2px solid rgb(255, 255, 255)",
                            }}
                            key={index}
                        >
                            {icon}
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Footer;
