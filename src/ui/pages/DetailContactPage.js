import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import contactReducer, { contactInitialState } from '../../redux/reducers/contactReducer';
import { getContactById } from '../../api/contactApi';
import { startLoadDetailContact, loadDetailContactSuccess, loadDetailContactFailure } from '../../redux/actions/contactAction/contactActions';
import LoadingIndicator from '../components/LoadingIndicator';

const DetailContactPage = () => {
  const { id } = useParams();
  const [contactState, contactDispatch] = useReducer(contactReducer, contactInitialState);
 
  useEffect(() => {
    getDataContact();
    console.log('effect...');
  }, [])

  const getDataContact = async () => {
    contactDispatch(startLoadDetailContact());
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

  return (
    <div>
      <h1>Detail Contact Page</h1>
      {contactState?.isLoadingDetail 
        ? <LoadingIndicator />
        : <p>{contactState?.selectedContact?.firstName} {contactState?.selectedContact?.lastName}</p>}
    </div>
  );
}

export default DetailContactPage;
