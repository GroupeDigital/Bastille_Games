import React from "react";
import classnames from "classnames";
import Stellantis from "../images/Stellantis.png";
// import "./card.scss";

const Card = ({
  onClick,
  card,
  index,
  isInactive,
  isFlipped,
  isDisabled,
  version
}) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive
      })}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <img src={Stellantis} alt="pokeball" />
      </div>
      <div className="card-face card-back-face">
        <img
          src={card.image}
          alt="pokeball"
          className={
            version === "Companies" ? "brand-card-image" : "default-card-image"
          }
        />
      </div>
    </div>
  );
};

export default Card;
