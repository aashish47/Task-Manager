import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createTask } from "../api/api";

const useCreateTaskMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Tasks"] });
            queryClient.invalidateQueries({ queryKey: ["Lists"] });
        },
    });
};

export default useCreateTaskMutation;
