import { useState } from "react"
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import confetti from "canvas-confetti";
import { WinnerModal } from "./components/WinnerModal";
import { GameBoard } from "./components/GameBoard";
import { useBoard } from "./hooks/useBoard";

const App = () => {

    const { board, resetGame, turn, updateBoard, winner } = useBoard(9);

    return (
        <main className="board" >

            <h1>Tic Tac Toe</h1>

            <button onClick={ resetGame }>
                Reset
            </button>

            <section className="game" >
                <GameBoard board={ board } updateBoard={ updateBoard } />
            </section>

            <section className="turn">
                <Square isSelected={ turn === TURNS.X }>{ TURNS.X }</Square>
                <Square isSelected={ turn === TURNS.O }>{ TURNS.O }</Square>
            </section>

            <WinnerModal winner={ winner } resetGame={ resetGame } />

        </main>
    )   
}

export default App