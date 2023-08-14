import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";
import SidebarLeft from "../components/home/SidebarLeft";
import { navbarHeight } from "../constants/constants";

type LayoutHomeProps = {
    children: ReactNode;
};

const LayoutHome: React.FC<LayoutHomeProps> = ({ children }) => {
    return (
        <Stack direction="row" justifyContent="flex-end">
            <SidebarLeft />
            <Box py={5} px={2} sx={{ overflowY: "auto", maxHeight: `calc(100vh - ${navbarHeight}px)`, width: "100%", maxWidth: { sm: "70vw" } }}>
                {children}
            </Box>
        </Stack>
    );
};

export default LayoutHome;
