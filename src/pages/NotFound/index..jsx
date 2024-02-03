import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div
        style={{
          textAlign: "center",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "650px",
          width: "auto",
          padding: "10px",
        }}
      >
        <h1 style={{ fontSize: "72px", color: "red" }}>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you are looking for does not exist..</p>
        <Link to={"/"}>
          <h4 style={{ color: "#0D28A6", padding: "10px" }}>
            <span style={{ paddingRight: "5px" }}>
              <i className="bi bi-arrow-left"></i>
            </span>
            Back to Homepage
          </h4>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
