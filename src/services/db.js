import { doc, setDoc, collection, query, where, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function isUsernameTaken(usernameToCheck) {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("username", "==", usernameToCheck));

    try {
        const querySnapshot = await getDocs(q);
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

export async function updateDbEmailVerified(uid) {
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {emailVerified: true});
    } catch(error) {
        console.error("Ошибка обновления emailVerified в базе данных:", error);
        throw error;        
    }
}

export async function updateBestScore(uid, key, score, HPsLeft, timeSpent) {
     try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
            [key]: {
                score: score,
                HPsLeft: HPsLeft,
                timeSpent: timeSpent
            }
        })
    } catch(error) {
        console.error("Ошибка при обновлении рекорда игрока:", error);
        throw error;
    }
}

export async function getAllUsers() {
    const users = [];
    try {
        const usersCollectionRef = collection(db, 'users');
        const q = query(usersCollectionRef);
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        })
        return users
    } catch (error) {
        console.error("Ошибка при загрузке рекордов игроков:", error);
    }
}

export function formatMilliseconds(ms) {
    return (ms / 1000).toFixed(3).replace(/\.?0+$/, '');
}