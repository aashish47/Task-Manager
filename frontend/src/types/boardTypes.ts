export type BoardType = {
    createdAt: string;
    createdBy: string;
    workspaceId: string;
    name: string;
    listsIds: [string];
    members: string[];
    admin: string;
    updatedAt: string;
    __v: number;
    _id: string;
};

export type CreateBoardType = {
    name: string;
    workspaceId: string;
    createdBy: string;
};
