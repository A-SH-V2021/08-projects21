import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Modal from "./Modal";
import Loading from "./Loading";

function App() {
  const { waiting, loading, questions, correct, index } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }

  if (loading) {
    return <Loading />;
  }
  console.log(questions);
  const { question, incorrect_answers, correct_answer } = questions[0];
  const answer = [...incorrect_answers, correct_answer];
  console.log(answer);
  return (
    <main>
      {/* <Modal/> */}
      <section className="quiz">
        <p className="correct-answers">
          correct answer is {correct}/ {index}
        </p>
        
      </section>
    </main>
  );
}

export default App;
