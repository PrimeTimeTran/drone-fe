import React from 'react';
import {
  Modal,
} from 'react-bootstrap'
import Login from './Login'

function AddDepModal(props) {
  return (
    <Modal className="modal-class" show={props.show} onHide={props.onHide}>
      <Login checkUser={props.checkUser}/>
    </Modal>
  )

}


export default AddDepModal
