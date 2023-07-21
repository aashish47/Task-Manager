import { styled } from "@mui/material/styles";
import { drawerWidth } from "../constants/constants";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "left" && prop !== "right" })<{
    left?: boolean;
    right?: boolean;
}>(({ theme, left, right }) => ({
    flexGrow: 1,
    padding: theme.spacing(1),
    paddingBottom: 0,
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    width: left && right ? `calc(100vw - ${2 * drawerWidth}px)` : left || right ? `calc(100vw - ${drawerWidth}px)` : `100vw`,
    marginLeft: left ? 0 : -drawerWidth,
    marginRight: right ? 0 : drawerWidth,
    ...(left && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    ...(right && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
export default Main;
