import { useEffect } from "react";

export function usePreloadImages(urls = []) {
    useEffect(() => {
        if (!urls.length) return;

        const images = urls.map((url) => {
            const img = new Image();
            img.src = url;
            return img;
        });

        return () => {
            images.forEach((img) => {
                img.onload = null;
                img.onerror = null;
            });
        };
    }, [urls]);
}