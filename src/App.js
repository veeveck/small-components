import { useEffect, useState } from "react";
import "../src/styles.css";
import ProgressBar from "./components/ProgressBar";

function App() {
  //Progress Bar
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setValue((val) => val + 1);
    }, 50);
  }, []);
  return (
    <div className="app">
      <h1> My React Components</h1>
      <ProgressBar value={value} onComplete={() => setSuccess(true)} />
      {success ? "Done!!" : "Loading..."}
    </div>
  );
}

export default App;
