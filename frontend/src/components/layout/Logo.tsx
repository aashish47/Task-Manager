import DashboardIcon from "@mui/icons-material/Dashboard";
import { Stack, Typography, useTheme } from "@mui/material";

type LogoProps = {
    color?: string;
};

const Logo: React.FC<LogoProps> = ({ color }) => {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    return (
        <Stack height="44px" alignItems="flex-start">
            <Stack direction="row">
                <Typography fontWeight={700} sx={{ color: color ? color : primary }} variant="caption" pl={3}>
                    ATLASSIAN
                </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
                <DashboardIcon sx={{ color: color ? color : primary }} fontSize="small" />
                <Typography sx={{ color: color ? color : secondary }} pl={0.5} variant="button">
                    Trello
                </Typography>
            </Stack>
        </Stack>
    );
};

export default Logo;
