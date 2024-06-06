import React, { useEffect, useState, useRef } from "react";
import pokeball from "./MemoryGameImages/pokeball.png";
import "./memoryGame.scss";
import uniqueCardsArray from "./uniqueCardsArray";

function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

const Karta = ({
  onClick,
  karta,
  index,
  isInactive,
  isFlipped,
  isDisabled
}) => {
  const handleClick = () => {
    console.log("handleClick");
    !isFlipped && !isDisabled && onClick(index);
  };

  const cardClass =
    "karta" +
    (isFlipped ? " is-flipped" : "") +
    (isInactive ? " is-inactive" : "");

  return (
    <div className={cardClass} onClick={handleClick}>
      <div className="karta-face karta-font-face">
        <img src={pokeball} alt="pokeball" />
      </div>
      <div className="karta-face karta-back-face">
        <img src={karta.image} alt="pokeball" />
      </div>
    </div>
  );
};

export default function MemoryGame() {
  const [cards, setCards] = useState(() =>
    shuffleCards(uniqueCardsArray.concat(uniqueCardsArray))
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const timeout = useRef(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const evaluate = () => {
    const [first, second] = openCards;
    console.log("First card:", first, "Second card:", second);

    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }
    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardClick = (index) => {
    console.log("handleCardClick", index);
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (karta) => {
    return Boolean(clearedCards[karta.type]);
  };

  return (
    <div className="Game">
      <header>
        <h3>Play the Flip karta game</h3>
        <div>
          Select two cards with the same content consecutively to make them
          vanish
        </div>
      </header>
      <div className="container">
        {cards.map((karta, index) => {
          return (
            <Karta
              key={index}
              karta={karta}
              index={index}
              isDisabled={shouldDisableAllCards}
              isInactive={checkIsInactive(karta)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}
            />
          );
        })}
      </div>
      <footer>
        <div className="score">
          <div className="moves">
            <span className="bold">Moves:</span> {moves}
          </div>
        </div>
      </footer>
    </div>
  );
}
