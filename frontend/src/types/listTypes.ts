export type ListType = {
    createdAt: string;
    createdBy: string;
    boardId: string;
    name: string;
    workspaceId: string;
    tasksIds: [string];
    updatedAt: string;
    __v: number;
    _id: string;
};

export type CreateListType = {
    name: string;
    workspaceId: string;
    boardId: string;
    createdBy: string;
};
