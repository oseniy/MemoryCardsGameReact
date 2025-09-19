import { createContext, useContext, useEffect, useState } from "react";
import { onIdTokenChanged } from "firebase/auth";
import { auth } from "./firebase";
import { getUserData } from "./db";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    useEffect(()=> {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const userData = await getUserData(uid);
                setUser(userData);
            } else {
                setUser(null);
            }
        }, (error) => {
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