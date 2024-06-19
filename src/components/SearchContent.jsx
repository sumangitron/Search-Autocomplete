const SearchContent = ({ data }) => {
  return (
    <div className="content">
      {data?.map((item, index) => {
        return <li key={index}>{item}</li>;
      })}
    </div>
  );
};

export default SearchContent;
