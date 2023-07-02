import { useQuery } from "@tanstack/react-query";
import { searchUsersByName } from "../api/api";
import { UserType } from "../types/userTypes";

const useSearchUsersByName = (name: string) => {
    const { data: users } = useQuery<Array<UserType>>({ queryKey: ["Users", name], queryFn: () => searchUsersByName({ name }) });

    return users;
};

export default useSearchUsersByName;
