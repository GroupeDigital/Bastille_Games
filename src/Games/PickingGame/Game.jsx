import React, { useState, useEffect } from "react";
import Card from "./Card";
import { shuffleArray, getData } from "./data";

function Game({ onGameEnd, version, correctCount }) {
  console.log("Version: ", version, correctCount);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(shuffleArray(getData(version)));

  const handleCardClick = (index) => {
    // Log the type of the clicked item
    console.log(items[index].type);

    setItems((prevItems) =>
      prevItems.map((item, i) => {
        if (i === index) {
          if (item.clicked) {
            return item; // Return the item as-is if it has already been clicked
          } else {
            const isCorrect = item.isStellantis;
            if (isCorrect) {
              setCount(count + 1);
            }
            return { ...item, clicked: true, isCorrect: isCorrect }; // Mark the item as clicked if it hasn't been clicked yet
          }
        } else {
          return item;
        }
      })
    );
  };

  useEffect(() => {
    if (correctCount && count === correctCount) {
      onGameEnd();
    }
  }, [count, onGameEnd, correctCount]);

  return (
    <div className={"MainGame"}>
      <div className="Hlavicka">
        <div className="Nadpis">
          {version === "Cars"
            ? "Vyberte všetky autá patriace do portfólia spoločnosti Stellantis"
            : "Vyberte všetky logá automobiliek patriacich pod spoločnosť Stellantis"}
        </div>
        <div className="Skore">{` ${count}/${correctCount}`}</div>
      </div>

      <div className="game-grid">
        {items.map((item, index) => (
          <Card
            item={item}
            key={item.name}
            onClick={() => handleCardClick(index)}
            version={version}
          />
        ))}
      </div>
    </div>
  );
}

export default Game;
