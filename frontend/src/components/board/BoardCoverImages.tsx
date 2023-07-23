import { ImageList, ImageListItem, ListItemButton } from "@mui/material";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import useUpdateBoardMutation from "../../hooks/board/useUpdateBoardMutation";
import { BoardType } from "../../types/boardTypes";

type CoverImages = {
    board: BoardType;
    photos: Basic[] | undefined;
    variant: "masonry" | "quilted" | "standard" | "woven";
    handleClose: () => void;
};

const CoverImages: React.FC<CoverImages> = ({ board, photos, variant, handleClose }) => {
    const { _id: boardId } = board;
    const updateBoardMutation = useUpdateBoardMutation();

    const handleImageClick = async (coverUrls: { full: string; raw: string; small: string; thumb: string; regular: string }) => {
        handleClose();
        const newBoard = { ...board, coverUrls };
        await updateBoardMutation.mutateAsync({ boardId, newBoard });
    };
    return (
        photos && (
            <ImageList variant={variant} cols={3} gap={2}>
                {photos.map((photo) => {
                    const { urls, description, id } = photo;
                    const { thumb } = urls;
                    return (
                        <ImageListItem onClick={() => handleImageClick(urls)} sx={{ p: 0 }} component={ListItemButton} key={id}>
                            <img loading="lazy" src={thumb} alt={description ?? ""} />
                        </ImageListItem>
                    );
                })}
            </ImageList>
        )
    );
};

export default CoverImages;
