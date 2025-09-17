import { createContext, useContext, useState } from "react";
import LoadingOverlay from "./LoadingOverlay";

const LoadingContext = createContext();

export function LoadingProvider({children}) {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={[loading, setLoading]}>
            {children}
            {loading && <LoadingOverlay/>}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    return useContext(LoadingContext);
}