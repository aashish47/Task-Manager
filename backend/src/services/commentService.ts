import Comment from "../models/Comment";

const createComment = async (newComment: Object) => {
    const comment = new Comment(newComment);
    return await comment.save();
};

const deleteComment = async (id: string) => {
    return await Comment.findByIdAndDelete(id);
};

const getAllComments = async () => {
    return await Comment.find({});
};

const getCommentsByTaskId = async (taskId: string) => {
    return await Comment.find({ taskId }).sort({ createdAt: -1 });
};

const updateComment = async (id: string, updaterQuery: object) => {
    return await Comment.findByIdAndUpdate(id, updaterQuery, { new: true });
};

const getCommentById = async (id: string) => {
    return await Comment.findById(id);
};

export default {
    createComment,
    deleteComment,
    getAllComments,
    updateComment,
    getCommentById,
    getCommentsByTaskId,
};
