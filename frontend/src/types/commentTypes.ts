export type CommentType = {
    taskId: string;
    description: string;
    createdBy: string;
    updatedAt: string;
    createdAt: string;
    uid: string;
    __v: number;
    _id: string;
};

export type CreateCommentType = {
    taskId: string;
    description: string;
    createdBy: string;
    uid: string;
};
