import React from "react";
import { Button } from "react-bootstrap";

function CustomButton({ option, onClick }) {
  return (
    <Button onClick={() => onClick(option)} className="m-3 btn-block option">
      {option}
    </Button>
  );
}

export default CustomButton;
