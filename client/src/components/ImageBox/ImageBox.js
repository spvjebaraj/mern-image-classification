import React from "react";
import "./ImageBox.css";
import Classification from "../Classification/Classification";

const ImageBox = ({ classification, imageUrl }) => {
  if (imageUrl !== "" && classification !== null) {
    return (
      <div className="center">
        <div className="image-container">
          <img
            id="inputimage"
            alt=""
            src={imageUrl}
            width="400px"
            heigh="auto"
          />
        </div>
        <div className="table-container">
          <Classification classifications={classification} />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ImageBox;
