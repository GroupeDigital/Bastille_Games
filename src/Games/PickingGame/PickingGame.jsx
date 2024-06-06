import React, { useState, useEffect } from "react";
import Game from "./Game";
import ResultModal from "./ResultModal";
import { getData, shuffleArray } from "./data";
import "./PickingGame.scss";

export default function PickingGame({ version }) {
  const [restart, setRestart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [gameData, setGameData] = useState([]);
  // console.log("Version: ", version);

  const handleRestart = () => {
    setRestart(!restart);
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    let data = getData(version).map((item) => ({ ...item, clicked: false }));
    setGameData(shuffleArray(data));
  }, [version]);

  // Function to count the number of "isStellantis=true" items
  const countCorrectItems = (data) => {
    return data.reduce(
      (count, item) => (item.isStellantis ? count + 1 : count),
      0
    );
  };

  const correctCount = countCorrectItems(gameData);

  return (
    <div>
      <Game
        key={restart}
        onGameEnd={handleShowModal}
        version={version}
        correctCount={correctCount}
        items={gameData}
      />
      {/* <button onClick={handleRestart}>Restart Game</button> */}
      <ResultModal open={showModal} onClose={handleRestart} />
    </div>
  );
}
