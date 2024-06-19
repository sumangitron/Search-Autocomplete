import { useState } from "react";
import { useEffect } from "react";
import SearchContent from "./SearchContent";

const AutoComplete = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [showContent, setShowContent] = useState(false);

  const handleChange = (event) => {
    setInputValue(event.target.value.toLowerCase());

    if (inputValue.length > 1) {
      let value = apiData?.filter(
        (item) => item.toLowerCase().indexOf(inputValue) > -1
      );
      setFilterData(value);
      setShowContent(true);
    } else {
      setShowContent(false);
    }
  };

  useEffect(() => {
    (async function getData() {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();

        console.log(data);
        setApiData(data.users.map((item) => item.firstName));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  console.log(apiData);
  console.log(filterData);

  if (loading === true) {
    return <h3>Loading data. Please wait...</h3>;
  }

  return (
    <div className="main-container">
      <input
        type="text"
        placeholder="Search here..."
        value={inputValue}
        onChange={handleChange}
      />
      {showContent && <SearchContent data={filterData} />}
    </div>
  );
};

export default AutoComplete;
