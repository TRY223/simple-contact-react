import React from 'react';
import LoadingIndicator from './LoadingIndicator';

const FormAddContact = ({ onSubmit, onChange, isLoading }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name='firstName' type='text' placeholder='Firstname' onChange={onChange} />
        <input name='lastName' type='text' placeholder='Lastname' onChange={onChange} />
        <input name='age' type='number' placeholder='Age' onChange={onChange} />
        <input name='photo' type='url' placeholder='Photo URL' onChange={onChange} />
        {isLoading
          ? <LoadingIndicator />
          : <button onClick={onSubmit}>submit</button>}
      </form>
    </div>
  );
}

export default FormAddContact;
