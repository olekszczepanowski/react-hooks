// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({squares, selectSquare}) {
  // const [squares, setSquares] = useLocalStorageState(
  //   'squares',
  //   Array(9).fill(null),
  // )

  // // React.useEffect(() => {
  // //   window.localStorage.setItem('squares', JSON.stringify(squares))
  // // }, [squares])

  // const nextValue = calculateNextValue(squares)
  // const winner = calculateWinner(squares)
  // const status = calculateStatus(winner, squares, nextValue)

  // function selectSquare(square) {
  //   if (winner || squares[square]) {
  //     return
  //   }

  //   const copySquares = [...squares]
  //   copySquares[square] = nextValue

  //   setSquares(copySquares)
  // }

  // function restart() {
  //   setSquares(Array(9).fill(null))
  // }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [currentStep, setCurrentStep] = useLocalStorageState('currentStep', 0)
  const [history, setHistory] = useLocalStorageState('history', [
    Array(9).fill(null),
  ])

  const currentSquares = history[currentStep]

  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)
  function selectSquare(square) {
    if (winner || currentSquares[square]) {
      return
    }
    const copySquares = [...currentSquares]
    copySquares[square] = nextValue
    const updatedHistory = history.slice(0, currentStep + 1)

    setHistory([...updatedHistory, copySquares])
    setCurrentStep(s => s + 1)
  }

  function restart() {
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }
  //moglbym w sumie zapisac tak jak nizej w przypadku ustawiania current w przycisku,
  //ale zaczalem tak i moj mozg lepiej mieli taki zapis moze tak byc???
  function setButtonTextValue(index) {
    let textValue = ''
    if (index === 0) {
      textValue = 'Go to game start'
    } else {
      textValue = `Go to move ${index}`
    }
    return textValue
  }

  const moves = history.map((elem, index) => {
    const textValue = setButtonTextValue(index)
    const isCurrentStep = index === currentStep

    return (
      <li key={index}>
        <button disabled={isCurrentStep} onClick={() => setCurrentStep(index)}>
          {textValue} {isCurrentStep ? `(current)` : null}
        </button>
      </li>
    )
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board selectSquare={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
