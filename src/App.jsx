import React, { useContext } from "react";
import { ModalContext, ModalProvider } from "./Helpers/ModalContext";
import Modal from "./Helpers/Modal";
import MemoryGame from "./Games/MemoryGame/MemoryGame";
import PickingGame from "./Games/PickingGame/PickingGame";
import QuizGame from "./Games/QuizGame/QuizGame";
import SpinToWin from "./Games/Lottery/SpinToWin";
import "./styles.scss";

const Card = ({ title, image, onClick, children }) => {
  return (
    <div className="card" onClick={onClick}>
      <h2>{title}</h2>
      <div className="subcards">{children}</div>
    </div>
  );
};

const SubCard = ({ title, onClick }) => {
  return (
    <div className="subcard" onClick={onClick}>
      <h3>{title}</h3>
    </div>
  );
};

const App = () => {
  return (
    <ModalProvider>
      <AppContent />
    </ModalProvider>
  );
};

const AppContent = () => {
  const { setShowModal, setModalContent, showModal, modalContent } = useContext(
    ModalContext
  );

  const openModalWithComponent = (Component, gameType) => {
    setModalContent(<Component version={gameType} />);
    setShowModal(true);
  };

  return (
    <div className="card-container">
      <Card
        title="Memory Game"
        image="/placeholder_300x200.png"
        // onClick={() => openModalWithComponent(MemoryGame, "Cars")}
      >
        <SubCard
          title="Cars"
          onClick={() => openModalWithComponent(MemoryGame, "Cars")}
        />
        <SubCard
          title="Companies"
          onClick={() => openModalWithComponent(MemoryGame, "Companies")}
        />
      </Card>

      <Card
        title="Picking Game"
        image="/placeholder_300x200.png"
        // onClick={() => openModalWithComponent(PickingGame, "Cars")}
      >
        <SubCard
          title="Cars"
          onClick={() => openModalWithComponent(PickingGame, "Cars")}
        />
        <SubCard
          title="Companies"
          onClick={() => openModalWithComponent(PickingGame, "Companies")}
        />
      </Card>
      <Card
        title="Quiz"
        image="/placeholder_300x200.png"
        onClick={() => openModalWithComponent(QuizGame)}
      />
      <Card
        title="Lottery"
        image="/placeholder_300x200.png"
        onClick={() => openModalWithComponent(SpinToWin)}
      />
      <Modal showModal={showModal}>{modalContent}</Modal>
    </div>
  );
};

export default App;
