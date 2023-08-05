export type WorkspaceType = {
    createdAt: string;
    createdBy: string;
    description: string;
    name: string;
    updatedAt: string;
    members: string[];
    guests: string[];
    __v: number;
    _id: string;
};

export type CreateWorkspaceType = {
    name: string;
    description: string;
    createdBy: string;
};
