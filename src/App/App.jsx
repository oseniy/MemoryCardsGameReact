import { Routes, Route, useLocation } from 'react-router'
import { useRef } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import styles from './App.module.css'
import backgroundImage from '../assets/imgs/background.png'

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
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={500}
          classNames="screen"
          unmountOnExit
        >
          <div ref={nodeRef} className="screen-container">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/LevelEasy" element={<LevelEasy />} />
              <Route path="/LevelNormal" element={<LevelNormal />} />
              <Route path="/LevelHard" element={<LevelHard />} />
              <Route path="/LeaderBoard" element={<LeaderBoard />} />
            </Routes>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}