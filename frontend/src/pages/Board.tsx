import { useParams } from "react-router-dom";
import DrawerBoard from "../components/DrawerBoard";

const Board = () => {
    const { bname = "", bid = "" } = useParams();
    return <DrawerBoard boardName={bname} boardId={bid} />;
};

export default Board;
