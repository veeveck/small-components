import React, { useState } from "react";
import "../App.css";

const useCopy = () => {
  const copy = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard is not enabled");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(`Error occuring in copying text : ${text}`, error);
    }
  };
  return copy;
};
const UseCopyHook = () => {
  const [value, setValue] = useState("");
  const copy = useCopy();
  return (
    <div className="App">
      <div>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
      <button onClick={() => copy(value)}>Copy</button>
    </div>
  );
};

export default UseCopyHook;
