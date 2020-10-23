import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ handleClose, show, children }) => {
  return show ? (
    <div className={`${styles.modal} ${styles['display-block']}`}>
      <section className={styles['modal-main']}>
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  ) : null;
};

export default Modal;
