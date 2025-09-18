import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from './firebase';
import { createUser, isUsernameTaken } from "./bd";

function errorMessage(error) {
    if (error && error.code) {
        switch (error.code) {
            case 'auth/invalid-credential':
            return 'Неверный адрес электронной почты или пароль.';
            case 'auth/user-not-found':
            return 'Пользователь с таким адресом электронной почты не найден.';
            case 'auth/wrong-password':
            return 'Неверный пароль.';
            case 'auth/email-already-in-use':
            return 'Этот адрес электронной почты уже используется.';
            case 'auth/network-request-failed':
            return 'Проверьте ваше интернет-соединение и попробуйте снова.';
            case 'auth/invalid-email':
            return 'Неверный формат адреса электронной почты.';
            case 'auth/user-disabled':
            return 'Ваша учетная запись была отключена администратором.';
            case 'auth/operation-not-allowed':
            return 'Метод аутентификации не разрешен.';
            case 'auth/too-many-requests':
            return 'Слишком много неудачных попыток входа.';
            case 'username-is-taken':
            return 'Этот никнейм уже используется.';
            case 'username-check-error':
            return 'Ошибка при проверке уникальности никнейма.';
            case 'user-create-error':
            return 'Ошибка при создании пользователя.'
            default:
            console.error("Неизвестная ошибка Firebase:", error.code, error.message);
            return 'Произошла непредвиденная ошибка.'; 
        }
    }
}
export async function signUp(email, username, password, confirmPassword) {

    if (password !== confirmPassword) {
    throw new Error("Пароли не совпадают!");
    }

    try {
        await isUsernameTaken(username);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        await createUser(uid, username, email);
    } catch (error) {
        error.message = errorMessage(error);
        throw error;
    }
}

export async function signIn(email, password) {

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        error.message = errorMessage(error);
        throw error;
    }
}