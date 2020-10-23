import React from 'react';
import styles from './CardContact.module.css';
import placeholder from '../../../assets/Portrait_Placeholder.png';

const CardContact = ({ contact, onClick }) => {
  return (
    <div className={styles['card-container']} onClick={onClick}>
      <div className={styles['img-container']}>
        {(contact?.photo ?? null) != null && (contact?.photo ?? null) != 'N/A' ?
          <img className={styles['img']} src={contact?.photo} /> :
          <img className={styles['img']} src={placeholder} />}
      </div>
      {contact?.firstName} {contact?.lastName}
    </div>
  );
}

export default CardContact;
