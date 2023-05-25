import Board from "../models/Board";

const createBoard = async (name: string, workspaceId: string, createdBy: string) => {
    const board = new Board({ name, workspaceId, createdBy });
    return await board.save();
};

const deleteBoard = async (id: string) => {
    return await Board.findByIdAndDelete(id);
};

const getAllBoards = async () => {
    return await Board.find();
};

const updateBoard = async (id: string, name: string, workspaceId: string) => {
    return await Board.findByIdAndUpdate(id, { name, workspaceId }, { new: true });
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
