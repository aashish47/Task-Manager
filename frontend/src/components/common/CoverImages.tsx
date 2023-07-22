import { ImageList, ImageListItem, ListItemButton } from "@mui/material";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import useUpdateTaskMutation from "../../hooks/task/useUpdateTaskMutation";
import { TaskType } from "../../types/taskTypes";

type CoverImages = {
    task: TaskType;
    photos: Basic[] | undefined;
    variant: "masonry" | "quilted" | "standard" | "woven";
    handleClose: () => void;
};

const CoverImages: React.FC<CoverImages> = ({ task, photos, variant, handleClose }) => {
    const { _id: taskId, boardId } = task;
    const updateTaskMutation = useUpdateTaskMutation();

    const handleImageClick = async (cover: string) => {
        handleClose();
        const newTask = { ...task, cover };
        await updateTaskMutation.mutateAsync({ boardId, taskId, newTask });
    };
    return (
        photos && (
            <ImageList variant={variant} cols={3} gap={2}>
                {photos.map((photo) => {
                    const { urls, description, id } = photo;
                    const { thumb, small } = urls;
                    return (
                        <ImageListItem onClick={() => handleImageClick(small)} sx={{ p: 0 }} component={ListItemButton} key={id}>
                            <img loading="lazy" src={thumb} alt={description ?? ""} />
                        </ImageListItem>
                    );
                })}
            </ImageList>
        )
    );
};

export default CoverImages;
