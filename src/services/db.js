import { doc, setDoc, collection, query, where, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function isUsernameTaken(usernameToCheck) {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("username", "==", usernameToCheck));

    try {
        const querySnapshot = await getDocs(q);
        console.log("empty: ", querySnapshot);
        if (!querySnapshot.empty) {
            const error = new Error("Этот никнейм уже используется.");
            error.code = "username-is-taken"
            throw error;
        }
    } catch (error) {
        if (error.code !== "username-is-taken") {
            error.code = "username-check-error";
        }
        throw error;
    }
}

export async function createUser(uid, username, email) {
    try {
        setDoc(doc(db, 'users', uid), {
            username: username,
            email: email
        })
    } catch(error) {
        error.code = "user-create-error"
        console.error("Ошибка при создании пользователя:", error);
        throw error;
    }

}

export async function getUsername(uid) {
    try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return userSnap.data().username;
        } else {
            console.warn("Документ не найден:", uid);
            return null;
        }
    } catch(error) {
        console.error("Ошибка при получении username:", error);
        throw error;
    }
}

export async function getUserData(uid) {
    try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        return userSnap.exists() ? userSnap.data() : null;
    } catch(error) {
        console.error("Ошибка при получении username:", error);
        throw error;
    }
}