import { useQuery } from "@tanstack/react-query";
import { getDefaultPhotos } from "../api/unsplashApi";

const useGetDefaultPhotos = () => {
    const { data: photos } = useQuery({ queryKey: ["Default Photos"], queryFn: () => getDefaultPhotos() });
    return photos;
};

export default useGetDefaultPhotos;
