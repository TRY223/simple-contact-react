import React, { useEffect, useReducer } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import contactReducer, { contactLastState } from '../../redux/reducers/contactReducer';
import { getContactById, deleteContactById } from '../../api/contactApi';
import { startLoadDetailContact, loadDetailContactSuccess, loadDetailContactFailure, startLoadDeleteContact, deleteContactSuccess, deleteContactFailure } from '../../redux/actions/contactAction/contactActions';
import LoadingIndicator from '../components/LoadingIndicator';

// TESTING
const DUMMY_RESPONSE_DATA = {
  'message': 'Get contact by ID',
  'data':{
    id: '9c2c1ba0-148e-11eb-b71c-4dde4651cea7',
    age: 18,
    firstName: 'Bilbo',
    lastName: 'Baggins',
    photo: 'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550'
  }
}

const DetailContactPage = () => {
  const { id } = useParams();
  const [contactState, contactDispatch] = useReducer(contactReducer, contactLastState);
  const history = useHistory();

  useEffect(() => {
    getDataContact();
  }, [])

  console.log('Detail contact page');
  console.log(contactState?.contacts);

  const getDataContact = async () => {
    contactDispatch(startLoadDetailContact());
    
    // TESTING
    return contactDispatch(loadDetailContactSuccess(DUMMY_RESPONSE_DATA.data));

    try {
      const response = await getContactById(id);
      if (response?.status === 200 ?? 500) {
        contactDispatch(loadDetailContactSuccess(response?.data?.data));
      } else {
        contactDispatch(loadDetailContactFailure(response?.data?.message ?? 'error occured'));
      }
    } catch(e) {
      console.log('error getDataContact:\n', e);
      contactDispatch(loadDetailContactFailure(e?.data?.message ?? 'error occured'));
    }
  }

  const deleteContact = async (id) => {
    contactDispatch(startLoadDeleteContact());

    // TESTING
    setTimeout(() => {
      contactDispatch(deleteContactSuccess(id));
      history.goBack();
    }, 2000);

    // try {
    //   const response = await deleteContactById(id);
    //   if (response?.status === 200 ?? 500) {
    //     contactDispatch(deleteContactSuccess(id));
    //     history.goBack();
    //   } else {
    //     contactDispatch(deleteContactFailure(response?.data?.message ?? 'error occured'));
    //   }
    // } catch (error) {
    //   console.log('error deleteContact:\n', error);
    //   contactDispatch(deleteContactFailure(error?.data?.message ?? 'error occured'));
    // }
  }

  const makeBody = () => {
    return (
      <div>
        <p>{contactState?.selectedContact?.firstName} {contactState?.selectedContact?.lastName}</p>
        {contactState?.isLoadingDelete
        ? <LoadingIndicator />
        : <div>
            <button>edit</button>
            <button onClick={() => deleteContact(contactState?.selectedContact?.id)}>delete</button>
          </div>}
      </div>
    );
  }

  return (
    <div>
      <h1>Detail Contact Page</h1>
      {contactState?.isLoadingDetail 
        ? <LoadingIndicator />
        : makeBody()}
    </div>
  );
}

export default DetailContactPage;
