import { useQuery } from "@tanstack/react-query";
import { getUserByUid } from "../../api/api";
import { UserType } from "../../types/userTypes";

const useGetUserByUid = (uid: string) => {
    const { data: users } = useQuery<UserType>({ queryKey: ["Users", uid], queryFn: () => getUserByUid({ uid }) });
    return users;
};

export default useGetUserByUid;
