import { Square } from "./Square"

export const GameBoard = ({ board, updateBoard }) => {

    return (
        board.map((board, index) => {
            return (
                <Square key={index} index={index} updateBoard={updateBoard} >
                    {board}
                </Square>
            )
        })
    )
}