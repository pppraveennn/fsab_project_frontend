import classes from "./start-button-styles.module.css"

function StartButton({ setStarted, setShowLB }) {
    function start() {
        setStarted(true)
        setShowLB(false)
    }
    return (
        <>
        <button onClick={start} className={classes.startButton}>
            Press to Start
        </button>
        </>
    )
}

export default StartButton