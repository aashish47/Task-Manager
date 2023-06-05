import { ReactNode } from "react";
import SidebarLeft from "../components/SidebarLeft";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchWorkspaces, fetchBoards } from "../api/api";

type LayoutHomeProps = {
    children: ReactNode;
};

const LayoutHome: React.FC<LayoutHomeProps> = ({ children }) => {
    useQuery({ queryKey: ["Workspaces"], queryFn: () => fetchWorkspaces() });
    useQuery({ queryKey: ["Boards"], queryFn: () => fetchBoards() });
    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "50px", gap: "50px" }}>
            <SidebarLeft />
            {children}
        </Box>
    );
};

export default LayoutHome;
