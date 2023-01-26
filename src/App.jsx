const TURNS = {
    X: 'x',
    O: 'o'
}

const board = Array(9).fill(null);

export const Square = ({children, index, updateBoard}) => {


    return (
        <div className="square" key={index}>
            {children}
        </div>
    )
}


const App = () => {

    return (
        <main className="board" >
            <h1>Tic Tac Toe</h1>
            <section className="game" >
                {
                    board.map( (_, index) => {
                        return (
                            <Square index={index}  >

                            </Square>
                        )
                    })
                }
            </section>
        </main>
    )
}

export default App