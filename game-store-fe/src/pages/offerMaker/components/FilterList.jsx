import QuantitySelector from '../../../components/QuantitySelector/QuantitySelector';
import Table from 'react-bootstrap/Table';
import { NO_ITEM_MATCH } from '../../../utils/textConstants';
const FilterList = ({
  data,
  onChangeQuantity,
  shouldReset,
  setShouldReset,
}) => {
  if (data.length === 0) {
    return (
      <div className="content">
        <p>{NO_ITEM_MATCH}</p>
      </div>
    );
  }

  return (
    <Table striped borderless hover>
      <tbody>
        {data.map((item) => (
          <tr className="tr-content" key={item.Name}>
            <td className="content">
              <img src={item.Img} alt={item.Name} />
              <p>{item.Name}</p>
            </td>
            <td className="quantity-content">
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
