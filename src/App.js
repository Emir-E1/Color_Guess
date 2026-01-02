import "./styles.css";
import { useEffect, useState } from "react";
import DisplayColor from "./components/DisplayColor";
function generateRandomHexColor() {
  let randomNumber = Math.floor(Math.random() * 16777215);
  let hexColor = randomNumber.toString(16);
  hexColor = hexColor.padStart(6, "0");
  return `#${hexColor.toUpperCase()}`;
}
// Example output: #A8B4F2

export default function App() {
  const [load, setLoad] = useState(true);
  const [correct, setCorrect] = useState(null);
  const [color, setColor] = useState(null);
  const [suggest, setSuggest] = useState([]);
  const CHOICE_NUMBER = 2;

  function fillSuggestion() {
    //if the color alr there i should regen and retry
    //complexity O(n)

    let suggestedColor = generateRandomHexColor();
    const colors = [color];

    for (let i = 0; i < CHOICE_NUMBER; i++) {
      do {
        suggestedColor = generateRandomHexColor();
      } while (
        suggest.some((el) => el.color === suggestedColor) ||
        (color && suggestedColor === color.color)
      );

      colors.push({
        color: suggestedColor,
        isMatch: false,
      });
    }
    console.log(colors, "before");
    colors.sort(() => Math.random() - 0.5);
    console.log(colors, "after");

    setSuggest([...colors]);
  }
  function handleVerify(selected) {
    if (!selected.isMatch) {
      return setTimeout(() => {
        setCorrect(false);
      }, 10);
    }
    console.log("correct");

    const real = {
      color: generateRandomHexColor(),
      isMatch: true,
    };
    setCorrect(true);
    setTimeout(() => {
      setColor(real);
    }, 10);
  }

  //INITIALIZE
  useEffect(() => {
    const real = {
      color: generateRandomHexColor(),
      isMatch: true,
    };
    setColor(real);
  }, []);

  useEffect(() => {
    if (!color) return;

    fillSuggestion();
    setLoad(false);
    console.log("list of suggestion", suggest);
  }, [color]);

  return (
    <div className="App">
      <h1>Guess The Color</h1>

      {!load && (
        <>
          <DisplayColor color={color?.color} />
          {suggest?.map((el, i) => (
            <button key={el.color + i} onClick={() => handleVerify(el)}>
              {el.color}
            </button>
          ))}
        </>
      )}

      {correct !== null && <h1>{correct ? "CORRECT" : "RETRY"}</h1>}
    </div>
  );
}
