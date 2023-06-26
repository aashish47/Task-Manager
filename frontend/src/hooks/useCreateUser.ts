import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../api/api";

const useCreateUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Users"] });
        },
    });
};

export default useCreateUserMutation;
