import { styled } from "@mui/material/styles";
import { drawerWidth } from "../constants/constants";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(1),
    paddingBottom: 0,
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    width: open ? `calc(100vw - ${drawerWidth}px)` : `100vw`,
    marginLeft: open ? 0 : -drawerWidth,

    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
export default Main;
