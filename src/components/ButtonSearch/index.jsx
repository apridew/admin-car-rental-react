import "./style.css";
const ButtonSearch = ({ text, handleClick, style }) => {
  return (
    <>
      <button onClick={handleClick} className={`btn-search ${style}`}>
        {text}
      </button>
    </>
  );
};

export default ButtonSearch;
