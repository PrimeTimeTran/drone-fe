import React from "react";

import { Toast } from "react-bootstrap";

import "./toast.css";

export default function Toastt() {
  return (
    <div id="toast" aria-live="polite" aria-atomic="true">
      <Toast>
        <Toast.Header className="text-white">
          <strong id="toast-header" className="mr-auto">
            Bootstrap
          </strong>
        </Toast.Header>
        {/* <Toast.Body>See? Just like this.</Toast.Body> */}
      </Toast>
    </div>
  );
}
