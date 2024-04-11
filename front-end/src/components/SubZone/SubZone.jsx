import "./SubZone.css";
import { useContext } from "react";
import { CardsDataContext, ResultContext, SubZoneContext } from "../../App";
import Card from "../Card/Card";
import CardsData from "../../utils/CardsData";

const SubZone = ({ title }) => {
  const { setCardsData } = useContext(CardsDataContext);
  const { subZoneData, setSubZoneData } = useContext(SubZoneContext);
  const {result, setResult} = useContext(ResultContext);

  const ondragover = (e) => {
    e.preventDefault();
  };

  const ondrop = async (e, title) => {
    const id = e.dataTransfer.getData("id");

    setResult({ correct: [], wrong: [] });

    setSubZoneData((prev) => {
      return prev.map((zone) => {
        if (zone.cards.includes(id)) {
          return {
            ...zone, cards: zone.cards.filter(card => card != id)
          }
        }
        return zone;
      });
    });
    
    setSubZoneData((prev) => {
      return prev.map((zone) => {
        if (zone.cards.includes(id)) {
          return {
            ...zone, cards: zone.cards.filter(card => card != id)
          }
        }
        if (
          zone.zonename === title &&
          zone.cards.length < 3 &&
          !zone.cards.includes(id)
        ) {
          setCardsData((cards) => cards.filter((card) => card.id != id));
          return {
            ...zone,
            cards: [...zone.cards, id],
          };
        }
        return zone;
      });
    });
  };

  return (
    <div className="subzone" draggable="false">
      <div className="group-title">
        <p>{title}</p>
      </div>
      <div
        className="cards-group"
        draggable="false"
        onDragOver={(e) => ondragover(e)}
        onDrop={(e) => ondrop(e, title)} 
        data-text="Drop items here..."
      >
        {subZoneData.map((zone) => {
          if (zone.zonename === title && zone.cards.length > 0) {
            return zone.cards.map((id) => (
              <Card
                classname={`${"subzone-card"} ${result.correct.includes(id) ? "green" : result.wrong.includes(id) && "red"}`}
                key={CardsData.find((card) => card.id === id).id}
                card={CardsData.find((card) => card.id === id)}
              />
            ));
          }
        })}
      </div>
    </div>
  );
};

export default SubZone;
