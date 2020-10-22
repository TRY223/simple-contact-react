import React from 'react';

const ContactCard = ({ contact, onClick }) => {
  return (
    <div onClick={onClick}>
      {contact?.firstName} {contact?.lastName}
    </div>
  );
}

export default ContactCard;
