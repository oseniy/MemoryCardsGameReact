import { createContext, useContext, useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore"; 
import { db } from "./firebase";
import { useAuth } from "./authContext";
import { useLoading } from "../components/Loading/LoadingContext";

const UserDataContext = createContext();

export function UserDataProvider({children}) {
    const [loading, setLoading] = useLoading();
    const {user} = useAuth();
    const [userData, setUserData] = useState(null);
    useEffect(()=> {
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            const unsubscribe = onSnapshot(userDocRef, (docSnapShot) => {
                setLoading(true);
                if (docSnapShot.exists()) {
                    setUserData(docSnapShot.data());
                    setLoading(false);
                } else {
                    setUserData(null);
                    setLoading(false);
                }
            }, (error) => {
                setLoading(false);
                console.error('Error in onSnapshot:', error);
                throw error;
            });
    
            return () => unsubscribe();
        }
    }, [user])

    return (
        <UserDataContext.Provider value={{userData}}>
            {children}
        </UserDataContext.Provider>
    )
}

export function useUserData() {
    return useContext(UserDataContext);
}