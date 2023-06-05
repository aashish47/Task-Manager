import { ReactNode } from "react";
import SidebarLeft from "../components/SidebarLeft";
import { Box } from "@mui/material";

type LayoutHomeProps = {
    children: ReactNode;
};

const LayoutHome: React.FC<LayoutHomeProps> = ({ children }) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "50px", gap: "50px" }}>
            <SidebarLeft />

            {children}
        </Box>
    );
};

export default LayoutHome;
