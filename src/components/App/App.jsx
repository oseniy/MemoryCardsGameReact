import styles from './App.module.css'
import backgroundImage from '../../assets/imgs/background.png'

export default function App() {
    return (
        <div className={styles.app} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1 className='font-header'>Привет, мир!</h1>
        </div>
    )
}