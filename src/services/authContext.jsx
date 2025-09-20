import { createContext, useContext, useEffect, useState } from "react";
import { onIdTokenChanged } from "firebase/auth";
import { auth } from "./firebase";
import { getUserData } from "./db";
import { useLoading } from "../components/Loading/LoadingContext";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [loading, setLoading] = useLoading();
    const [user, setUser] = useState(null);
    useEffect(()=> {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            setLoading(true);
            if (user) {
                const uid = user.uid;
                const userData = await getUserData(uid);
                setUser(userData);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
        }, (error) => {
            setLoading(false);
            console.error('Error in onIdTokenChanged:', error);
            throw error;
        });

        return () => unsubscribe();
    }, [])

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}