import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendInvitation } from "../api/api";

const useSendInvitationMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: sendInvitation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Boards"] });
        },
    });
};

export default useSendInvitationMutation;
