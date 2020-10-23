import React, { useEffect, useRef } from 'react';
import LoadingIndicator from './LoadingIndicator';

const FormAddContact = ({ onSubmit, onChange, isLoading, onLoad = () => null, initialData = {} }) => {
  
  const firstNameEl = useRef(null);
  const lastNameEl = useRef(null);
  const ageEl = useRef(null);
  const photoEl = useRef(null);

  useEffect(() => {
    firstNameEl.current.value = initialData?.firstName ?? null;
    lastNameEl.current.value = initialData?.lastName ?? null;
    ageEl.current.value = initialData?.age ?? null;
    photoEl.current.value = initialData?.photo ?? null;
    onLoad(initialData);
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input ref={firstNameEl} name='firstName' type='text' placeholder='Firstname' onChange={onChange} />
        <input ref={lastNameEl} name='lastName' type='text' placeholder='Lastname' onChange={onChange} />
        <input ref={ageEl} name='age' type='number' placeholder='Age' onChange={onChange} />
        <input ref={photoEl} name='photo' type='url' placeholder='Photo URL' onChange={onChange} />
        {isLoading
          ? <LoadingIndicator />
          : <button onClick={onSubmit}>submit</button>}
      </form>
    </div>
  );
}

export default FormAddContact;
