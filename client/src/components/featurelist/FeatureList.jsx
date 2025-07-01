import React from "react";
import "./featurelist.scss";

const features = [
  "Cost Effective",
  "Good Location",
  "Trust Worthy",
];

const FeatureList = () => {
  return (
    <ul className="feature-list">
      {features.map((feature, index) => (
        <li key={index} className="feature-item">
          <span className="checkmark">&#x2713;</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
};

export default FeatureList;
