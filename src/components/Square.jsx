
export const Square = ({children, index, updateBoard, isSelected}) => {

    const handleClick = () => {
        updateBoard(index);
    }

    return (
        <div 
            className={`square ${isSelected ? 'is-selected' : ''}`}
            onClick={handleClick}
        >
            {children}
        </div>
    )
}