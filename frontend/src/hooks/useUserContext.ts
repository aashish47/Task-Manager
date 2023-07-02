import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/api";
import { UserType } from "../types/userTypes";

const useUsersContext = () => {
    const { data: users } = useQuery<Array<UserType>>(["Users"], () => fetchUsers());

    return users;
};

export default useUsersContext;
