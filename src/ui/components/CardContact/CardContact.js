import React from 'react';

const CardContact = ({ contact, onClick }) => {
  return (
    <div onClick={onClick}>
      {contact?.firstName} {contact?.lastName}
    </div>
  );
}

export default CardContact;
