import React, { useEffect } from "react";
import { useState } from "react";
import "../styles.css";
const ProgressBar = ({ value = 0, onComplete }) => {
  const [percent, setPercent] = useState(value);
  useEffect(() => {
    setPercent(Math.min(100, Math.max(0, value)));
    if (value >= 100) {
      onComplete();
    }
  }, [value]);
  return (
    <div className="progress">
      <span style={{ color: percent > 49 ? "white" : "black" }}>
        {percent.toFixed()}%
      </span>
      {/* <div style={{ width: `${percent.toFixed()}%` }} /> */}
      <div
        style={{
          transform: `scaleX(${percent / 100})`,
          transformOrigin: "left",
        }}
      />
    </div>
  );
};

export default ProgressBar;
