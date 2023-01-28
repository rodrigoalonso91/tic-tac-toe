import confetti from "canvas-confetti";
import { useState } from "react"
import { TURNS } from "../constants";
import { checkIsEndGame } from "../helpers/checkIsEndGame";
import { checkWinner } from "../helpers/checkWinner";

export const useBoard = (squares) => {
    
    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem('board');
        return boardFromStorage ? JSON.parse(boardFromStorage) : Array(squares).fill(null);
    });
    
    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem('turn');
        return turnFromStorage ? turnFromStorage : TURNS.X;
    });

    const [winner, setWinner] = useState(null);

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
        setBoard(Array(squares).fill(null));
        setWinner(null);
        window.localStorage.clear();
    };

    return {
        winner,
        updateBoard,
        resetGame,
        board,
        turn
    }
}