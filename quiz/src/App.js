import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Modal from "./Modal";
import Loading from "./Loading";

function App() {
  const { waiting, loading, questions, correct, index, createMarkup } =
    useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }

  if (loading) {
    return <Loading />;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];
  const answers = [...incorrect_answers, correct_answer];
  console.log(questions);
  return (
    <main>
      {/* <Modal/> */}
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
                ></button>
              );
            })}
          </div>
          <button className="next-question">next quistion</button>
        </article>
      </section>
    </main>
  );
}

export default App;
