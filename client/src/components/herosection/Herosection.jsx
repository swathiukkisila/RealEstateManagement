import React from "react";
import "./Herosection.scss"; // SCSS for custom styles
import FeatureList from "../featurelist/FeatureList";
import { Link } from "react-router-dom";

const Herosection = () => {
  return (
    <div class="content">
    <section class="main-section">
        <div class="content-left">
            <h1 class="section-title">
                Reason To Choose
            </h1>
            <p class="section-description">
                <FeatureList/>
            </p>
            <div class="button-group">
                <Link to="/">
                    <button class="start-button">Start Now</button>
                </Link>
                <Link to="/list">
                    <button class="tour-button">Take Tour</button>
                </Link>
                
            </div>
        </div>
        <div class="content-right">
            <div class="image-container">
                <img src="/homeimage1.jpg" alt="image" class="image"/>
            </div>
        </div>
    </section>
</div>
  );
};

export default Herosection;
