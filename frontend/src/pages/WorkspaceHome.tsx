import { useParams } from "react-router-dom";
import WorkspaceBoards from "../components/WorkspaceBoards";

const WorkspaceHome = () => {
    const { id = "" } = useParams<{ id: string }>();
    return <WorkspaceBoards workspaceId={id} />;
};

export default WorkspaceHome;
