import { useState, useEffect, useCallback, useMemo } from 'react';
// components
import SearchBar from '../../components/SearchBar';
import ToggleBtn from './components/ToggleBtn';
import LoadingSpinner from '../../components/Spinner';
import ItemList from '../../components/ItemList/Itemlist';
// fake database
import { getAllItems, getUserItems } from '../../services/itemService';
// styles
import './Inventory.css';
import { MOD, RECICLER_OFF, RECICLER_ON } from '../../utils/constants';
import { LOCAL_USERNAME } from '../../utils/textConstants';

const Inventory = () => {
  const [toggle, setToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const result = toggle
      ? await getAllItems()
      : await getUserItems(localStorage.getItem(LOCAL_USERNAME));

    setData(result || []);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  }, [toggle]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = useMemo(() => {
    if (!data.length) {
      return [];
    }
    return data.filter((item) =>
      item.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const toggleButton = () => {
    if (!isLoading) {
      setToggle((prevToggle) => !prevToggle);
    }
  };

  return (
    <div className="inventory-container">
      <div className="container inventory">
        <div className="inventory-header">
          <SearchBar
            filterKey={'Name'}
            setSearchQuery={setSearchQuery}
            placeholder={searchQuery}
          />
          <ToggleBtn toggle={toggle} onClick={toggleButton} />
        </div>
        <div className="inventory-body">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <ItemList
              allTheItems={filteredData}
              modal={MOD}
              recicler={toggle ? RECICLER_OFF : RECICLER_ON}             
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
