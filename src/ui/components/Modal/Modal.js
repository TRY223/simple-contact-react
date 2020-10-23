import React from 'react';
import './Modal.css';

const Modal = ({ handleClose, show, children }) => {
  return show ? (
    <div className='modal display-block'>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  ) : null;
};

export default Modal;
