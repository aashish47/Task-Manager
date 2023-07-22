import { ReactNode } from "react";
import SidebarLeft from "../components/home/SidebarLeft";
import { Stack } from "@mui/material";

type LayoutHomeProps = {
    children: ReactNode;
};

const LayoutHome: React.FC<LayoutHomeProps> = ({ children }) => {
    return (
        <Stack direction="row" justifyContent="center" sx={{ gap: "50px", mt: 5, mb: 5 }}>
            <SidebarLeft />
            {children}
        </Stack>
    );
};

export default LayoutHome;
