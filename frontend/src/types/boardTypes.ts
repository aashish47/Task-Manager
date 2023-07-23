export type BoardType = {
    createdAt: string;
    createdBy: string;
    workspaceId: string;
    name: string;
    listsIds: [string];
    members: string[];
    admin: string;
    coverUrls: { full: string; raw: string; regular: string; small: string; thumb: string };
    updatedAt: string;
    __v: number;
    _id: string;
};

export type CreateBoardType = {
    name: string;
    workspaceId: string;
    createdBy: string;
};
