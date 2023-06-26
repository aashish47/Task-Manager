import { useQuery } from "@tanstack/react-query";
import { searchUsersByName } from "../api/api";

export type UserType = {
    createdAt: string;
    email: string;
    uid: string;
    name: string;
    updatedAt: string;
    __v: number;
    _id: string;
};

const useSearchUsersByName = (name: string) => {
    const { data: users } = useQuery<Array<UserType>>({ queryKey: ["Users", name], queryFn: () => searchUsersByName({ name }) });

    return users;
};

export default useSearchUsersByName;
