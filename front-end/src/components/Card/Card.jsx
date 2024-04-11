import "./Card.css";

const Card = ({ card, classname }) => {
  const ondragover = (e) => {
    e.preventDefault();
  };

  const ondragstart = (e, id, image, cardname) => {
    e.dataTransfer.setData("id", id);
    e.dataTransfer.setData("image", image);
    e.dataTransfer.setData("name", cardname);
  };

  return (
    <div
      className={classname}
      draggable
      onDragStart={(e) => ondragstart(e, card.id, card.image, card.cardname)}
      onDragOver={(e) => ondragover(e)}
    >
      <img src={card.image} alt={card.cardname} draggable="false" />
      <span>{card.cardname}</span>
    </div>
  );
};

export default Card;
