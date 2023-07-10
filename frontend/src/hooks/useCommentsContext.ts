import { useQuery } from "@tanstack/react-query";
import { fetchCommentsByTaskId } from "../api/api";
import { CommentType } from "../types/commentTypes";

const useCommentsContext = (taskId: string) => {
    const { data: comments } = useQuery<Array<CommentType>>({ queryKey: ["Comments", taskId], queryFn: () => fetchCommentsByTaskId({ taskId }) });
    return comments;
};

export default useCommentsContext;
