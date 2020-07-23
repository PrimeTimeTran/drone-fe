import React from "react";

function Button({ option, onClick }) {
  return (
    <p onClick={() => onClick(option)} className="option">
      {option}
    </p>
  );
}

export default Button;
