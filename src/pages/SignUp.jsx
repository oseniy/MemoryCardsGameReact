import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { auth } from '../firebase';
import NavButton from '../components/Buttons/NavButton';
import Screen from '../components/Screen/Screen';
import Input from '../components/Input/Input'
import TextMain from '../components/Texts/TextMain/TextMain';
import SubmitButton from '../components/Buttons/SubmitButton';
import { useLoading } from '../components/Loading/LoadingContext';

export default function SignUp() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [username, setUsername] = useState();
    const [loading, setLoading] = useLoading();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
        alert('Пароли не совпадают!')
        return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setLoading(false);
            navigate("/")

        } catch (error) {
            setLoading(false);
            alert(`Ошибка регистрации: ${errorCode}`, errorMessage);
            console.error(`Ошибка регистрации: ${errorCode}`);
        }
        e.target.reset();
    }

    return (
        <Screen>
            <form onSubmit={handleSubmit}>
                <Input 
                type="email" 
                placeholder="email" 
                id="signUpEmailJS" 
                required 
                onChange={(e) => {setEmail(e.target.value)}}/>

                <Input 
                type="text" 
                placeholder="никнейм" 
                id="signUpUsernameJS" 
                maxLength={15} 
                minLength={3} 
                required
                onChange={(e) => {setUsername(e.target.value)}}/>

                <Input 
                type="password" 
                placeholder="пароль" 
                id="signUpPasswdJS" 
                minLength={6} 
                required
                onChange={(e) => {setPassword(e.target.value)}}/>

                <Input 
                type="password" 
                placeholder="пароль повторно" 
                id="signUpPasswdConfirmJS" 
                minLength={6} 
                required
                onChange={(e) => {setConfirmPassword(e.target.value)}}/>

                <SubmitButton text={"Зарегистрироваться"}/>
            </form>
            <NavButton/>
        </Screen>
    )
}