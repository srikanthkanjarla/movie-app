import React from "react";
import "./MovieThumb.css";

const MovieThumb = props => {
  const { image } = props;
  console.log(image);
  return (
    <div className="rmdb-moviethumb">
      <img src={image} alt="movie thumb" />
    </div>
  );
};

export default MovieThumb;
