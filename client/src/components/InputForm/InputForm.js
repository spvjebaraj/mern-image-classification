import React, { useContext, useState } from "react";
import { Context as ClassificationContext } from "../../context/ClassificationContext";
import "./InputForm.css";
import ImageBox from "../ImageBox/ImageBox";
import ReactLoading from "react-loading";

const InputForm = () => {
  const [url, setUrl] = useState("");

  const {
    state: { isLoading, classification },
    getImageDetails,
  } = useContext(ClassificationContext);

  return (
    <>
      <p className="form-heading">
        This App will detect the image and share the details. Give it a try.
      </p>
      <div className="center">
        <div className="center form-container">
          <input
            className="form-input center"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="form-button"
            onClick={() => getImageDetails({ url })}
          >
            Detect
          </button>
        </div>
      </div>
      <div className="center">
        <ImageBox classification={classification} imageUrl={url} />
      </div>
      {isLoading ? (
        <div className="center">
          <ReactLoading type="spin" color="#fff" />
        </div>
      ) : null}
    </>
  );
};

export default InputForm;
