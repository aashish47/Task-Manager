import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/api";

export type UserType = {
    createdAt: string;
    email: string;
    uid: string;
    name: string;
    updatedAt: string;
    __v: number;
    _id: string;
};

const useUsersContext = () => {
    const { data: users } = useQuery<Array<UserType>>(["Users"], () => fetchUsers());

    return users;
};

export default useUsersContext;
