// imports..
import DropZone from "./components/DropZone/DropZone";
import CardsZone from "./components/CardsZone/CardsZone";
import { createContext, useState } from "react";
import CardsData from "./utils/CardsData";
import { Result } from "./utils/Result";

// CreateContext Hooks
export const CardsDataContext = createContext({});
export const SubZoneContext = createContext({});
export const ResultContext = createContext({});

function App() {
  const [cardsData, setCardsData] = useState(CardsData);

  const [subZoneData, setSubZoneData] = useState([
    { zonename: "source", cards: [] },
    { zonename: "load", cards: [] },
    { zonename: "path", cards: [] },
  ]);

  const [result, setResult] = useState({
    correct: [],
    wrong: [],
  });

  // handleReset function will handle the reset button
  const handleReset = (e) => {
    e.preventDefault();
    setCardsData(CardsData);
    setSubZoneData((prev) =>
      prev.map((zone) => {
        return { ...zone, cards: [] };
      })
    );
    setResult({ correct: [], wrong: [] });
  };

  // handleCheck function Will handle check button
  const handleCheck = (e) => {
    e.preventDefault();
    subZoneData.map((zone) => {
      Result.map((answer) => {
        if (answer.zonename === zone.zonename) {
          zone.cards.map((card) => {
            if (answer.cards.includes(card)) {
              setResult((prev) => ({
                ...prev,
                correct: [...prev.correct, card],
              }));
            } else {
              setResult((prev) => ({ ...prev, wrong: [...prev.wrong, card] }));
            }
          });
        }
      });
    });
  };

  return (
    <CardsDataContext.Provider value={{ cardsData, setCardsData }}>
      <SubZoneContext.Provider value={{ subZoneData, setSubZoneData }}>
        <ResultContext.Provider value={{ result, setResult }}>
          <div className="wrapper">
            <DropZone />
            <CardsZone />
          </div>
          <div className="buttons">
            <button className="checkbtn" onClick={(e) => handleCheck(e)}>
              Check
            </button>
            <button className="resetbtn" onClick={(e) => handleReset(e)}>
              Reset
            </button>
          </div>
        </ResultContext.Provider>
      </SubZoneContext.Provider>
    </CardsDataContext.Provider>
  );
}

export default App;
