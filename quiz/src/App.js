import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Modal from "./Modal";
import Loading from "./Loading";

function App() {
  const {
    waiting,
    loading,
    questions,
    correct,
    index,
    createMarkup,
    nextQueston,
    checkAnswer
  } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }

  if (loading) {
    return <Loading />;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];
  const answers = [...incorrect_answers, correct_answer];
 
  return (
    <main>
      <Modal/>
      <section className="quiz">
        <p className="correct-answers">
          correct answer is {correct}/ {index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={createMarkup(`${question}`)} />
          <div className="btn-container">
            {answers.map((answer, idx) => {
              return (
                <button
                  key={idx}
                  className="answer-btn"
                  dangerouslySetInnerHTML={createMarkup(`${answer}`)}
                  onClick={()=>checkAnswer(correct_answer===answer)}
                ></button>
              );
            })}
          </div>
          <button className="next-question" onClick={nextQueston}>
            next quistion
          </button>
        </article>
      </section>
    </main>
  );
}

export default App;
