import { useState } from "react"
import { Square } from "./components/Square";
import { TURNS, WINNING_COMBOS } from "./constants";
import confetti from "canvas-confetti";
import { WinnerModal } from "./components/WinnerModal";
import { checkWinner } from "./helpers/checkWinner";
import { checkIsEndGame } from "./helpers/checkIsEndGame";

const App = () => {

    const [board, setBoard] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState(TURNS.X);
    const [winner, setWinner] = useState(null)

    const updateBoard = (index) => {

        if ( board[index] || winner ) return;

        const newBoard = [...board];
        newBoard[index] = turn;
        setBoard(newBoard);

        const newWinner = checkWinner(newBoard);

        if (newWinner) {
            confetti();
            setWinner(newWinner);
        }
        else if (checkIsEndGame(newBoard)) {
            setWinner(false);
        }

        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
        setTurn(newTurn);

    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
    };

    return (
        <main className="board" >

            <h1>Tic Tac Toe</h1>

            <button onClick={resetGame}>
                Reset
            </button>

            <section className="game" >
                {
                    board.map( (board, index) => {
                        return (
                            <Square key={index} index={index} updateBoard={updateBoard} >
                                {board}
                            </Square>
                        )
                    })
                }
            </section>

            <section className="turn">
                <Square isSelected={turn === TURNS.X} >{TURNS.X}</Square>
                <Square isSelected={turn === TURNS.O} >{TURNS.O}</Square>
            </section>

            <WinnerModal winner={winner} resetGame={resetGame} />
        </main>
    )   
}

export default App