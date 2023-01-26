import { useState } from "react"
import { Square } from "./components/Square";
import { TURNS, WINNING_COMBOS } from "./constants";
import confetti from "canvas-confetti";
import { WinnerModal } from "./components/WinnerModal";
import { checkWinner } from "./helpers/checkWinner";
import { checkIsEndGame } from "./helpers/checkIsEndGame";
import { GameBoard } from "./components/GameBoard";

const App = () => {

    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem('board');
        return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
    });

    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem('turn');
        return turnFromStorage ? turnFromStorage : TURNS.X;
    });

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
            return;
        }
        else if (checkIsEndGame(newBoard)) {
            setWinner(false);
            return;
        }

        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
        setTurn(newTurn);

        window.localStorage.setItem('board', JSON.stringify(newBoard));
        window.localStorage.setItem('turn', newTurn);

    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
        window.localStorage.clear();
    };

    return (
        <main className="board" >

            <h1>Tic Tac Toe</h1>

            <button onClick={resetGame}>
                Reset
            </button>

            <section className="game" >
                <GameBoard board={ board } updateBoard={ updateBoard } />
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