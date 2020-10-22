import React, { useReducer, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { loadContactsSuccess, loadContactsFailure, startLoadContacts } from '../../redux/actions/contactAction/contactActions'
import contactReducer, { contactInitialState } from '../../redux/reducers/contactReducer';
import { getAllContacts } from '../../api/contactApi'
import LoadingIndicator from '../components/LoadingIndicator';
import ContactCard from '../components/ContactCard';

const ContactPage = () => {

  const history = useHistory();
  const [contactState, contactDispatch] = useReducer(contactReducer, contactInitialState)

  useEffect(() => {
    getDataContacts();
  }, [])

  const getDataContacts = async () => {
    contactDispatch(startLoadContacts());
    try {
      const response = await getAllContacts();
      if (response?.status === 200 ?? 500) {
        contactDispatch(loadContactsSuccess(response?.data?.data ?? []));
      } else {
        contactDispatch(loadContactsFailure(response?.data?.message ?? 'error occured'));
      }
    } catch(e) {
      console.log('error getDataContacts:\n', e);
      contactDispatch(loadContactsFailure(e?.data?.message ?? 'error occured'));
    }
  }

  return (
    <div>
      <h1>Contact Page</h1>
      <button>Tambah</button>
      {contactState?.isLoading 
        ? <LoadingIndicator />
        : contactState.contacts.map((contact) => <ContactCard key={contact?.id} contact={contact} onClick={() => history.push(`/contacts/${contact.id}`)} />)}
    </div>
  )
}

export default ContactPage;
