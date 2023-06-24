import { List, ListSubheader } from "@mui/material";
import SidebarRight from "./SidebarRight";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import HomeTasksCards from "./HomeTasksCards";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Home = () => {
    return (
        <>
            {/* <button onClick={handleLogout}>Logout</button> */}

            <List
                sx={{ mx: { xs: 1, md: 0 }, width: "100%", maxWidth: 500 }}
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" sx={{ position: "static", display: "flex", alignItems: "center", gap: "5px" }}>
                        <AccessTimeIcon fontSize="small" />
                        Up next
                    </ListSubheader>
                }
            >
                <HomeTasksCards />
            </List>
            <SidebarRight />
        </>
    );
};

export default Home;
