"use client"
import { useState, useEffect } from "react"
import classes from "./questions-styles.module.css"

function Timer({ setShowLB, setStarted, answered }) {
    const [time, setTime] = useState(60)
    useEffect(() => {
        time > 0 && setTimeout(() => setTime(time - 1), 1000);
        if (time == 0) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: 'React POST Request Example' })
            };
            async function postData() {
                await fetch("http://localhost:8080/submit-score?score="+String(answered), requestOptions)
                setStarted(false)
                setShowLB(true)
            }
            postData()
        }
      }, [time]);
    return (
        <>
            <h2 className={classes.timer}>Time: {time}</h2>
        </>
    )
}

function Questions({ setFeedback, answered, setAnswered }) {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    function generateQuestion() {
        if (answered % 4 == 0) {
            let num1 = getRandomInt(50)
            let num2 = getRandomInt(50)
            return {
                text: `${num1} + ${num2} = `, 
                answer: num1 + num2
            }
        }
        else if (answered % 4 == 1) {
            let num1 = getRandomInt(50)
            let num2 = getRandomInt(50)
            if (num1 >= num2) {
                return {
                    text: `${num1} - ${num2} = `,
                    answer: num1 - num2
                }
            }
            else {
                return {
                    text: `${num2} - ${num1} = `,
                    answer: num2 - num1
                }
            }
        }
        else if (answered % 4 == 2) {
            let num1 = getRandomInt(12)
            let num2 = getRandomInt(12)
            return {
                text: `${num1} * ${num2} = `,
                answer: num1 * num2
            }
        }
        else if (answered % 4 == 3) {
            let quotient =  getRandomInt(12)
            let divisor = getRandomInt(12) + 1
            return {
                text: `${quotient * divisor} / ${divisor} = `,
                answer: quotient
            }
        }
    }
    let question = generateQuestion()
    function onAnswer(e) {
        e.preventDefault()
        let answerBox = document.getElementById("answerBox")
        let answer = Number(answerBox.value)
        let feedback = document.getElementById("feedback")
        if (answer == question.answer) {
            document.getElementById("answerBox").value = ""
            setFeedback("Correct!")

            feedback.classList.remove(classes.wrong)
            feedback.classList.add(classes.right)            
            setAnswered(answered + 1)
        }
        else {
            document.getElementById("answerBox").value = ""
            setFeedback("Wrong!")
            feedback.classList.remove(classes.right)
            feedback.classList.add(classes.wrong)     
        }
        
    }

    return (
        <>
            <div className="container">
                <h2 className={classes.answered}>Answered: {answered} </h2>
                <div className="questionAnswer">
                    <h1 className={classes.questionText}>{question.text}</h1>
                    <form onSubmit={onAnswer}>
                        <input type="text" inputMode="numeric" autoFocus id="answerBox" className={classes.answerBox}>
                        </input>
                    </form>
                </div>
            </div>
            
        </>
    )
}

function QuestionGUI({ setShowLB, setStarted, answered, setAnswered }) {
    const [feedBack, setFeedback] = useState("")
    return <>
        <Timer setShowLB={setShowLB} setStarted={setStarted} answered={answered}/>
        <Questions setFeedback={setFeedback} answered={answered} setAnswered={setAnswered}/>
        <p id="feedback" className={classes.feedback}>{feedBack}</p>
    </>
}

export default QuestionGUI