import "./style.css";
const ButtonSearch = ({ text, chooseCategory, style }) => {
  return (
    <>
      <button onClick={chooseCategory} className={`btn-search ${style}`}>
        {text}
      </button>
    </>
  );
};

export default ButtonSearch;
