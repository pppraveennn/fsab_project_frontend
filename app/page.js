"use client"
import { useState, useEffect } from "react"

// We import components from other files like this
import classes from "./page-styles.module.css"
import QuestionGUI from "./components/questions"
import StartButton from "./components/startButton"
import Leaderboard from "./components/leaderboard"

// In a `page.js` file, we usually call the page function `Home`
export default function Home() {
  const [started, setStarted] = useState(false)
  const [showLB, setShowLB] = useState(false)
  const [answered, setAnswered] = useState(0)
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Mental Math Challenge</h1>
      </div>
      <div className={classes.instructions}>
        <p>Welcome to the mental math challenge! You will have 1 minute to answer as many math questions as you can. Press the button to start!</p>
      </div>
      {started ? 
        <QuestionGUI setStarted={setStarted} setShowLB={setShowLB} answered={answered} setAnswered={setAnswered}/> :
        <StartButton setStarted={setStarted} setShowLB={setShowLB}/>
        }
      {showLB ?
        <Leaderboard score={answered}/> :
        <></>
      }
    </div>
  );
}
