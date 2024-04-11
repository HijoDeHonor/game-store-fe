import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Item({ item }) {
  return (
    <div className="item-container" key={item.id}>
      <Card className="item-card">
        <Card.Img className="item-img" variant="top" src={item.img} alt={item.Name} />
        <Card.Body>
          <Card.Title className="item-p">{item.Name}</Card.Title>
          {item.Quantity &&(
            <Card.Text className="item-p">{item.Quantity}</Card.Text>
          )}
          {item.Quantity &&(
            <Button className="item-btn" >Show Modal</Button>
          )}
          {!item.Quantity &&(
            <Button className="item-btn" >Add Item</Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Item;