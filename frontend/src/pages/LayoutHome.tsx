import { Stack } from "@mui/material";
import { ReactNode } from "react";
import SidebarLeft from "../components/home/SidebarLeft";

type LayoutHomeProps = {
    children: ReactNode;
};

const LayoutHome: React.FC<LayoutHomeProps> = ({ children }) => {
    return (
        <Stack direction="row" justifyContent="center" sx={{ gap: "50px", my: 5, mx: 1 }}>
            <SidebarLeft />
            {children}
        </Stack>
    );
};

export default LayoutHome;
