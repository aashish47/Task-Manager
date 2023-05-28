import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";

export default function NestedList() {
    return (
        <List
            sx={{ display: { xs: "none", lg: "block" }, width: "100%", maxWidth: 200, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Recently Viewed
                </ListSubheader>
            }
        ></List>
    );
}
