import React from 'react';
import {
  Modal,
} from 'react-bootstrap'
import Register from './Register'

function RegistrationModel(props) {
  return (
    <Modal className="reg-modal" show={props.show} onHide={props.onHide}>
      <Register checkUser={props.checkUser}/>
    </Modal>
  )

}


export default RegistrationModel
