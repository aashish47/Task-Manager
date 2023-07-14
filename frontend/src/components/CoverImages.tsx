import { ImageList, ImageListItem, ListItemButton } from "@mui/material";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { TaskType } from "../types/taskTypes";
import useUpdateTaskMutation from "../hooks/useUpdateTaskMutation";

type CoverImages = {
    task: TaskType;
    photos: Basic[] | undefined;
    variant: "masonry" | "quilted" | "standard" | "woven";
};

const CoverImages: React.FC<CoverImages> = ({ task, photos, variant }) => {
    const { _id: taskId, boardId, cover } = task;
    const updateTaskMutation = useUpdateTaskMutation();

    const handleImageClick = async (cover: string) => {
        const newTask = { ...task, cover };
        await updateTaskMutation.mutateAsync({ boardId, taskId, newTask });
    };
    return (
        photos && (
            <ImageList variant={variant} cols={3} gap={2}>
                {photos.map((photo) => {
                    const { urls, description, id } = photo;
                    const { thumb, regular } = urls;
                    return (
                        <ImageListItem onClick={() => handleImageClick(regular)} sx={{ p: 0 }} component={ListItemButton} key={id}>
                            <img src={thumb} alt={description ?? ""} />
                        </ImageListItem>
                    );
                })}
            </ImageList>
        )
    );
};

export default CoverImages;