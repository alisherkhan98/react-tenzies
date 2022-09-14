import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());

  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect((tenzies) => {
    let allHeld = dice.every((die) => die.isHeld === true);
    let firstValue = dice[0].value;
    let allSame = dice.every((die) => die.value === firstValue);

    if (allHeld && allSame) {

      setTenzies(true);
    }
  }, [dice]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld
          ? die
          : { ...die, value: Math.floor(Math.random() * 6 + 1) };
      })
    );
  }

  function toggleHold(id) {
    setDice((prevDice) =>
      prevDice.map((die) => ({
        ...die,
        isHeld: id === die.id ? !die.isHeld : die.isHeld,
      }))
    );
  }


  function newGame () {
    setTenzies(false);
    setDice(allNewDice())
  }

  let diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      toggleHold={() => toggleHold(die.id)}
    />
  ));
  return (
    <main>
      {tenzies && <Confetti/>}

      <h2 className="title">Tenzies</h2>
      <h4 className="para">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </h4>
      <div className="die-container">{diceElements}</div>

      {tenzies ? (
        <button onClick={newGame}>New Game</button>
      ) : (
        <button onClick={rollDice}>Roll</button>
      )}

    </main>
  );
}

export default App;
