import { useQuery } from "@tanstack/react-query";
import { searchPhotos } from "../../api/unsplashApi";

const useSearchPhotos = (query: string) => {
    const { data: photos } = useQuery({ queryKey: ["Photos", query], queryFn: () => searchPhotos({ query }) });
    return photos;
};

export default useSearchPhotos;
