import Board from "../models/Board";

const createBoard = async (name: string, workspaceId: string, createdBy: string) => {
    const board = new Board({ name, workspaceId, createdBy });
    return await board.save();
};

const deleteBoard = async (id: string) => {
    return await Board.findByIdAndDelete(id);
};

const getAllBoards = async (userId: string) => {
    return await Board.find({ members: userId });
};

const updateBoard = async (id: string, updaterQuery: object) => {
    return await Board.findByIdAndUpdate(id, updaterQuery, { new: true });
};

const getBoardById = async (id: string) => {
    return await Board.findById(id);
};

export default {
    createBoard,
    deleteBoard,
    getAllBoards,
    updateBoard,
    getBoardById,
};
