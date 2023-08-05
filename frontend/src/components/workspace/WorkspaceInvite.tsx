import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useUpdateWorkspaceMembers from "../../hooks/workspace/useUpdateWorkspaceMembes";
import useWorkspacesContext from "../../hooks/workspace/useWorkspaceContext";
import UserAutocomplete from "../common/UserAutoComplete";

const WorkspaceInvite = () => {
    const { wid: workspaceId = "" } = useParams();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const updateWorkspaceMembers = useUpdateWorkspaceMembers();
    const workspaces = useWorkspacesContext();
    const workspace = workspaces?.find((workspace) => workspace._id === workspaceId);
    const members = [...(workspace?.members ?? []), ...(workspace?.guests ?? [])];

    const handleButtonClick = async () => {
        const members = tags;

        try {
            await updateWorkspaceMembers.mutateAsync({ workspaceId, members });
        } catch (error: any) {
            console.log("Error adding member", error.messaage);
        }
        handleClose();
    };

    const handleClose = () => {
        setTags([]);
        setName("");
        setOpen(false);
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="contained" sx={{ alignSelf: "flex-start" }}>
                Invite workspace members
            </Button>
            <Dialog fullWidth maxWidth="sm" disableRestoreFocus open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle>Share Workspace</DialogTitle>
                <form autoComplete="off">
                    <DialogContent>
                        <UserAutocomplete members={members} tags={tags} setTags={setTags} name={name} setName={setName} />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleButtonClick}>Invite</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default WorkspaceInvite;
