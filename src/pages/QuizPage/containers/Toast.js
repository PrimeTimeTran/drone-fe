import React from "react";

import { Toast } from "react-bootstrap";

import './toaststyles.css'

export default function Toastt() {
  return (
    <div
      id="toast"
      aria-live="polite"
      aria-atomic="true"
    >
      <Toast
        style={{
          top: 10,
          right: 10,
          position: "absolute",
        }}
      >
        <Toast.Header>
          <strong id="toast-header"className="mr-auto">Bootstrap</strong>
        </Toast.Header>
        {/* <Toast.Body>See? Just like this.</Toast.Body> */}
      </Toast>
    </div>
  );
}
