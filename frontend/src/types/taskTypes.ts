export type TaskType = {
    createdAt: string;
    createdBy: string;
    listId: string;
    boardId: string;
    workspaceId: string;
    name: string;
    description: string;
    cover: string;
    dueDate: Date;
    isCompleted: boolean;
    updatedAt: string;
    __v: number;
    _id: string;
};

export type CreateTaskType = {
    name: string;
    listId: string;
    boardId: string;
    createdBy: string;
    workspaceId: string;
};
