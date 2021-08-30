import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Modal from "./Modal";
import Loading from './Loading'

function App() {
  const { waiting, loading } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }

  if (loading) {
    return <Loading/>
  }
  return <main>quiz app</main>;
}

export default App;
