import { Box, List, ListSubheader } from "@mui/material";

import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import HomeTasksCards from "../components/HomeTasksCards";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Home = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate("/");
        } catch (error) {
            console.log("Error signing out:", error);
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", mt: "50px", gap: "50px" }}>
                {/* <button onClick={handleLogout}>Logout</button> */}

                <SidebarLeft />
                <List
                    sx={{ width: "100%", maxWidth: 500 }}
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader" sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <AccessTimeIcon fontSize="small" />
                            Up next
                        </ListSubheader>
                    }
                >
                    <HomeTasksCards />
                </List>
                <SidebarRight />
            </Box>
        </>
    );
};

export default Home;
