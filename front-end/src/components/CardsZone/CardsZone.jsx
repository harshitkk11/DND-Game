import "./CardsZone.css";
import { CardsDataContext } from "../../App";
import { useContext } from "react";
import Card from "../Card/Card";

const CardsZone = () => {
  const { cardsData } = useContext(CardsDataContext);

  return (
    <div className="cardszone" draggable="false">
      {cardsData.map((card) => (
        <Card classname="card" card={card} key={card.id} />
      ))}
    </div>
  );
};

export default CardsZone;
