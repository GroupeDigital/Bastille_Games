import React from "react";
import "./PickingGame.scss";

function Card({ item, onClick, version }) {
  return (
    <div
      className={`card-root ${
        item.clicked ? (item.isCorrect ? "correctBlink" : "shakeAnimation") : ""
      }`}
      onClick={onClick}
    >
      <img
        src={item.image}
        className={
          version === "Companies" ? "brand-card-image" : "default-card-image"
        }
        alt=""
      />
    </div>
  );
}

export default Card;
