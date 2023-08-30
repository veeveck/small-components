import { useEffect, useState } from "react";
import "../styles.css";

let order = 0;
let allClicked = false;
const FillBoxes = () => {
  const [boxState, setBoxState] = useState(getBoxes("initial"));

  useEffect(() => {
    if (boxState.some((box) => !box.isClicked)) {
      allClicked = false;
    } else {
      allClicked = true;
    }
    if (allClicked) {
      boxState.forEach((item, index) => {
        return setTimeout(() => {
          let tempBox = [...boxState];
          tempBox[index].isClicked = false;
          setBoxState(tempBox);
        }, 200 * (index + 1));
      });
    }
  }, [boxState]);
  function getBoxes(type) {
    const boxesData = [];
    const boxes = [0, 1, 2].map((i) => {
      return [0, 1, 2].map((j) => {
        if (!(i === 1 && j > 0)) {
          if (type === "initial") {
            return boxesData.push({ i, j, isClicked: false, order: null });
          }
          return (
            <div
              style={{
                backgroundColor:
                  boxState?.find((item) => item.i === i && item.j === j)
                    ?.isClicked && "green",
              }}
              className="box"
              onClick={() => changeColor(i, j)}
            ></div>
          );
        }
        return <div></div>;
      });
    });
    if (type === "initial") {
      return boxesData;
    }
    return boxes;
  }
  const changeColor = (i, j) => {
    let temp = [...boxState];
    console.log(temp);
    const selectedBox = temp.find((item) => item.i === i && item.j === j);
    selectedBox.isClicked = true;
    selectedBox.order = ++order;
    temp.sort((a, b) => (a.order > b.order ? 1 : -1));
    setBoxState(temp);
  };
  return <div className="box-container">{getBoxes()}</div>;
};

export default FillBoxes;
