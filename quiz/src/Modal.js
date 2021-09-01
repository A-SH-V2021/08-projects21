import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { closeModal, correct, modal, questions } = useGlobalContext();
  return (
    <div className={modal ? `modal-container isOpen` : 'modal-container'}>
      <div className="modal-content">
        <h2>ooops...</h2>
        <p>{`you answer ${correct} correct from ${questions.length}`} </p>
      <button className="close-btn" onClick={closeModal}>play agein</button>
      </div>
    </div>
  );
};

export default Modal;
