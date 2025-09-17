import { useEffect, useState } from "react";
import OverlayText from "../Texts/OverlayText/OverlayText";

export default function LoadingOverlay() {

    const [frame, setFrame] = useState("...");
    const frames = [".", "..", "..."];
    let index = 0;
    let intervalId = null;
    useEffect(() => {
        intervalId = setInterval(() => {
            setFrame(frames[index]);
            index = (index + 1) % frames.length;
        }, 300)

        return () => clearInterval(intervalId);
    }, [])

    return (
        <OverlayText show>{frame}</OverlayText>
    )
}