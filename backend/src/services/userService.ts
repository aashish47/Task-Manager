import User from "../models/User";

const createUser = async (newUser: object) => {
    const user = new User(newUser);
    return await user.save();
};

const deleteUser = async (id: string) => {
    return await User.findByIdAndDelete(id);
};

// const searchUsersByName = async (name: string) => {
//     const db = mongoose.connection.db;
//     const collection = db.collection(User.collection.name);

//     const result = await collection
//         .find({ $text: { $search: name } })
//         .sort({ score: { $meta: "textScore" } })
//         .toArray();
//     return result;
// };

const searchUsersByName = async (name: string) => {
    const regex = new RegExp(name, "i"); // 'i' for case-insensitive search
    return await User.find({ name: { $regex: regex } });
};

const getAllUsers = async () => {
    return await User.find({});
};

const updateUser = async (id: string, updaterQuery: object) => {
    return await User.findByIdAndUpdate(id, updaterQuery, { new: true });
};

const getUserById = async (id: string) => {
    return await User.findById(id);
};

const getUserByUid = async (uid: string) => {
    return await User.findOne({ uid });
};

export default {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
    searchUsersByName,
    getUserByUid,
};
