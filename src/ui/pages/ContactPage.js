import React, { useReducer, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { loadContactsSuccess, loadContactsFailure, startLoadContacts, addContact, addContactFailure, startLoadAddContact } from '../../redux/actions/contactAction/contactActions'
import contactReducer, { contactLastState } from '../../redux/reducers/contactReducer';
import { getAllContacts, createContact } from '../../api/contactApi'
import LoadingIndicator from '../components/LoadingIndicator';
import ContactCard from '../components/CardContact';
import Modal from '../components/Modal';
import FormAddContact from '../components/FormAddContact';

// TESTING
const DUMMY_RESPONSE_DATA = {"message":"Get contacts","data":[{"id":"b3abd640-c92b-11e8-b02f-cbfa15db428b","firstName":"Luke","lastName":"Skywalker","age":29,"photo":"N/A"},{"firstName":"Bilbo","lastName":"Baggins","age":18,"photo":"http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550","id":"9c2c1ba0-148e-11eb-b71c-4dde4651cea7"},{"firstName":"emergency","lastName":"food","age":12,"photo":"none","id":"6182e820-148f-11eb-b71c-4dde4651cea7"},{"firstName":"Jhon","lastName":"doe","age":22,"photo":"http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550","id":"50d80580-1491-11eb-b71c-4dde4651cea7"},{"firstName":"joni","lastName":"doe","age":20,"photo":"http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550","id":"025735f0-1493-11eb-b71c-4dde4651cea7"},{"firstName":"jhan","lastName":"doe","age":22,"photo":"http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550","id":"56f3d650-1497-11eb-b71c-4dde4651cea7"},{"firstName":"line","lastName":"doe","age":43,"photo":"http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550","id":"958d3a50-1497-11eb-b71c-4dde4651cea7"},{"firstName":"lina","lastName":"doe","age":33,"photo":"http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550","id":"e4d4f170-1497-11eb-b71c-4dde4651cea7"}]}

const ContactPage = () => {

  const history = useHistory();
  const [contactState, contactDispatch] = useReducer(contactReducer, contactLastState);
  const [isShowModal, setIsShowModal] = useState(false);
  const [formData, setFormdata] = useState({});

  const handleOpenModal = () => setIsShowModal(true);
  const handleCloseModal = () => setIsShowModal(false);
  const handleClearFormData = () => setFormdata({});

  useEffect(() => {
    getDataContacts();
  }, [])

  console.log('Contact page');
  console.log(contactState?.contacts);

  const getDataContacts = async () => {
    contactDispatch(startLoadContacts());

    //TESTING
    return contactDispatch(loadContactsSuccess(DUMMY_RESPONSE_DATA.data));

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

  const submitForm = async (objData) => {
    contactDispatch(startLoadAddContact());

    // TESTING
    setTimeout(() => {
      contactDispatch(addContact(objData));
      handleCloseModal();
      handleClearFormData();
    }, 2000);

    // try {
    //   const response = await createContact(objData);
    //   if (response?.status === 200 ?? 500) {
    //     contactDispatch(addContact(objData));
    //   }
    //   else {
    //     contactDispatch(addContactFailure(response?.data?.message ?? 'error occured'));
    //   }
    //   handleClearFormData();
    // } catch (error) {
    //   console.log('error submitForm:\n', error);
    //   contactDispatch(addContactFailure(error?.data?.message ?? 'error occured'));
    //   handleClearFormData();
    // }
  }

  return (
    <div>
      <h1>Contact Page</h1>
      <button onClick={handleOpenModal}>Tambah</button>
      <Modal show={isShowModal} handleClose={handleCloseModal}>
        <p>Create New Contact</p>

        <FormAddContact
          isLoading={contactState?.isLoadingAddContact ?? false}
          onChange={(e) => {
            setFormdata({...formData, [e.target.name]: e.target.value});
          }}
          onSubmit={(e) => {
            e.preventDefault();
            formData.age = parseInt(formData?.age);
            console.log(formData);
            submitForm(formData);
          }} />

      </Modal>
      {contactState?.isLoading 
        ? <LoadingIndicator />
        : contactState.contacts.map((contact, idx) => <ContactCard key={idx} contact={contact} onClick={() => history.push(`/contacts/${contact.id}`)} />)}
    </div>
  )
}

export default ContactPage;
