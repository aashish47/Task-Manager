import AccessTimeIcon from "@mui/icons-material/AccessTime";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";

const SideBarRight = () => {
    return (
        <List
            sx={{ display: { xs: "none", lg: "block" }, width: "100%", maxWidth: 250, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader" sx={{ position: "static", display: "flex", alignItems: "center", gap: "5px" }}>
                    <AccessTimeIcon fontSize="small" />
                    Recently Viewed
                </ListSubheader>
            }
        ></List>
    );
};

export default SideBarRight;
