import React, { useState } from "react";

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({ children, isSelected, updateBoard, index }) => { // Agregar 'index' como prop
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index) // Pasar 'index' como argumento a 'updateBoard'
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}
const winner_combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
function App() {
  const [tablero, setTablero] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkwinner = (tableroToCheck) => {
    for ( const combo of winner_combos){
      const [a, b, c] = combo
      if (
        tableroToCheck[a] &&
        tableroToCheck[a] === tableroToCheck [b] &&
        tableroToCheck[a] === tableroToCheck [c] 

      ){
        return tableroToCheck[a]
      }
    }
    return null; 
  }
 
  const updateBoard = (index) => {
    // si ya tiene algo
    if (tablero[index] || winner) return
    //actualizar
    const newTablero = [...tablero]
    newTablero[index] = turn
    setTablero(newTablero)
    //turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkwinner(newTablero)
    if(newWinner){
      setWinner(newWinner)
      alert(`el ganador es ${newWinner}` )

    }
  }

  return (
    <main className='tablero'>
      <h1>TRIQUI</h1>
      <section className='game'>
        {tablero.map((value, index) => (
          <Square
            key={index}
            index={index} // Pasar 'index' como prop
            isSelected={value === TURNS.X || value === TURNS.O}
            updateBoard={updateBoard}
          >
            {value}
          </Square>
        ))}
      </section>

      <div className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </div>
    </main>
  )
}

export default App;
