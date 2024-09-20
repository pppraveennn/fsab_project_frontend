"use client"
import { useState, useEffect } from "react"
import classes from "./leaderboard-styles.module.css"

function Leaderboard({ score }) {
    const [scores, setScores] = useState([])
    const [rank, setRank] = useState("")
    useEffect(() => {
        const fetchData = async () => {
          const result = await fetch("http://localhost:8080/high-scores")
          result.json().then(json => {
            let scoreList = json.map((score, index) => {
                <li>
                    <p> {score.Date} </p>
                    <p> {score.score} </p>
                    <p> {index + 1} </p>
                </li>
            })
            setScores(json)
            console.log(json)
        })}
        fetchData();
    }, [])
    useEffect(() => {
        const fetchData = async () => {
          const result = await fetch("http://localhost:8080/get-rank?score="+String(score))
          result.json().then(json => {
            setRank(json.rank)
        })}
        fetchData();
    }, [])
    return (
        <>
            <div className={classes.container}>
                <h1 className={classes.leaderboardTitle}> Leaderboard </h1>
                <h2> Your Rank: {rank} </h2>
                <ul>
                    <li className={classes.lbRow}>
                        <p> Ranking </p>
                        <p> Score </p>
                        <p> Date </p>
                        
                    </li>
                    {scores.map((score, index) => <li key={index} className={classes.lbRow}>
                        <p> {index + 1} </p>
                        <p> {score.Score} </p>
                        <p> {score.Date} </p>
                    </li>
                    )}

                </ul>
            </div>
        </>
    )
}

export default Leaderboard