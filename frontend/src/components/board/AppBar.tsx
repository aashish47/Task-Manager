import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { drawerWidth } from "../../constants/constants";

interface AppBarProps extends MuiAppBarProps {
    left?: boolean;
    right?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "left" && prop !== "right",
})<AppBarProps>(({ theme, left, right }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    width: left && right ? `calc(100vw - ${2 * drawerWidth}px)` : left || right ? `calc(100vw - ${drawerWidth}px)` : `100vw`,
    marginLeft: left ? 0 : -drawerWidth,
    marginRight: right ? 0 : drawerWidth,

    ...(left && {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    ...(right && {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
export default AppBar;
