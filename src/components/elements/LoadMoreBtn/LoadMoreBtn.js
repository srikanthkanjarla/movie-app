import React from "react";
import "./LoadMoreBtn.css";

const LoadMoreBtn = props => {
  const { handleLoadMore, text } = props;
  return (
    <div className="rmdb-loadmorebtn" onClick={handleLoadMore}>
      {text}
    </div>
  );
};

export default LoadMoreBtn;
