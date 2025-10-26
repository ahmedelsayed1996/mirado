import { useCallback } from "react";

const useCleanPath = () => {
    const cleanPath = useCallback((file: string) => {
        const match = file.match(/upload\/.*/);
        return match ? match[0] : file;
    }, []);

    return { cleanPath };
};

export default useCleanPath;
