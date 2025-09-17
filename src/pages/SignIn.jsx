import NavButton from '../components/Buttons/NavButton';
import Screen from '../components/Screen/Screen';
import Input from '../components/Input/Input'
import TextMain from '../components/Texts/TextMain/TextMain';
export default function SignIn() {
    return (
        <Screen>
            <form>
                <Input type="email" placeholder="email" id="signUpEmailJS" required/>
                <Input type="password" placeholder="пароль" id="signUpPasswdJS" minLength={6} required/>
            </form>
            <TextMain>Войти</TextMain>
            <NavButton/>
        </Screen>
    )
}