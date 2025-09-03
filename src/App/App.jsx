import { Routes, Route, useLocation } from 'react-router'
import { useRef } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import styles from './App.module.css'
import backgroundImage from '../assets/imgs/background.png'
import { GameProvider } from '../components/Game/GameContext'

import Home from '../pages/Home/Home'
import LevelEasy from '../pages/LevelEasy/LevelEasy'
import LevelNormal from '../pages/LevelNormal/LevelNormal'
import LevelHard from '../pages/LevelHard/LevelHard'
import LeaderBoard from '../pages/LeaderBoard/LeaderBoard'

export default function App() {
  const location = useLocation()
  const nodeRef = useRef(null)

  return (
    <div
      className={styles.app}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
        <SwitchTransition>
          <CSSTransition
            key={location.key}
            nodeRef={nodeRef}
            timeout={500}
            classNames="screen"
            unmountOnExit
          >
            <div ref={nodeRef} className={styles.screenContainer}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                  <Route path="/LevelEasy" element={
                    <GameProvider>
                      <LevelEasy />
                    </GameProvider>
                    } />
                  <Route path="/LevelNormal" element={
                    <GameProvider>
                      <LevelNormal />
                    </GameProvider>
                    } />
                  <Route path="/LevelHard" element={
                    <GameProvider>
                      <LevelHard />
                    </GameProvider>
                    } />
                  <Route path="/LeaderBoard" element={<LeaderBoard />} />
              </Routes>
            </div>
          </CSSTransition>
        </SwitchTransition>
    </div>
  )
}