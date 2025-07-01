import React from "react";
import { useNavigate } from "react-router-dom";
import "./frontpage.scss";

const FrontPage = () => {
  const navigate = useNavigate();

  return (
    <div className="front-page">
      <div className="overlay"></div>
      <div className="content">
        {/*<img src="/logo.png" alt="Realtors Logo" className="logo" />*/}
        <h1>Your Way Home</h1>
        <div className="buttons">
          <button className="btn sign-up" onClick={() => navigate("/home")}>Take Tour</button>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
