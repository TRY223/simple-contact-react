import React from 'react';
import styles from './CardContact.module.css';

const CardContact = ({ contact, onClick }) => {
  return (
    <div className={styles['card-container']} onClick={onClick}>
      {contact?.firstName} {contact?.lastName}
    </div>
  );
}

export default CardContact;
