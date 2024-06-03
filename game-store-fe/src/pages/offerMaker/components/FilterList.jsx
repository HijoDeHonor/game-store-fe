import QuantitySelector from "../../../components/QuantitySelector";
import Table from "react-bootstrap/Table";
const FilterList = ({
  data,
  onChangeQuantity,
  shouldReset,
  setShouldReset,
}) => {
  if (data.length === 0) {
    return (
      <div className="content">
        <p>There is no match for that item name.</p>
      </div>
    );
  }

  return (
    <Table striped borderless hover>
      <tbody>
        {data.map((item) => (
          <tr className="tr-content" key={item.Id}>
            <td className="content">
              <img src={item.Img} alt={item.Name} />
            </td>
            <td className="content">
              <p>{item.Name}</p>
            </td>
            <td className="content">
              <QuantitySelector
                item={item}
                hasReset={true}
                shouldShowQuantity={true}
                onChangeQuantity={(newQuantity) =>
                  onChangeQuantity(item, newQuantity)
                }
                maxQuantity={item.maxQuantity}
                shouldReset={shouldReset}
                setShouldReset={setShouldReset}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default FilterList;
