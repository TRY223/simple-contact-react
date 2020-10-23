import React, { useEffect, useReducer, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import contactReducer, { contactLastState } from '../../redux/reducers/contactReducer';
import { getContactById, deleteContactById } from '../../api/contactApi';
import { startLoadDetailContact, loadDetailContactSuccess, loadDetailContactFailure, startLoadDeleteContact, deleteContactSuccess, deleteContactFailure } from '../../redux/actions/contactAction/contactActions';
import LoadingIndicator from '../components/LoadingIndicator';
import Modal from '../components/Modal/Modal';
import FormContact from '../components/FormContact';
import illustration from '../../assets/undraw_profile_details_f8b7.svg';

const DetailContactPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [contactState, contactDispatch] = useReducer(contactReducer, contactLastState);
  const [isShowModal, setIsShowModal] = useState(false);
  const [formData, setFormdata] = useState({});

  const handleOpenModal = () => setIsShowModal(true);
  const handleCloseModal = () => setIsShowModal(false);
  const handleClearFormData = () => setFormdata({});
  
  let mounted = true;

  useEffect(() => {
    getDataContact();
    
    return function cleanup() {
      mounted = false;
    }
  }, [])

  const getDataContact = async () => {
    if (mounted) contactDispatch(startLoadDetailContact());

    try {
      const response = await getContactById(id);
      if ((response?.status >= 200 ?? false) && (response?.status < 300 ?? false)) {
        if (mounted) contactDispatch(loadDetailContactSuccess(response?.data?.data));
      } else {
        if (mounted) contactDispatch(loadDetailContactFailure(response?.data?.message ?? 'error occured'));
      }
    } catch (e) {
      console.log(`error getDataContact:\n${e?.response?.data?.message}`);
      if (mounted) contactDispatch(loadDetailContactFailure(e?.response?.data?.message ?? e?.message ?? 'error occured'));
    }
  }

  const deleteContact = async (id) => {
    contactDispatch(startLoadDeleteContact());

    try {
      const response = await deleteContactById(id);
      if ((response?.status >= 200 ?? false) && (response?.status < 300 ?? false)) {
        contactDispatch(deleteContactSuccess(id));
        history.goBack();
      } else {
        contactDispatch(deleteContactFailure(response?.data?.message ?? 'error occured'));
      }
    } catch (error) {
      console.log(`error deleteContactById:\n${error?.response?.data?.message}`);
      contactDispatch(deleteContactFailure(error?.response?.data?.message ?? error?.message ?? 'error occured'));
    }
  }

  const submitForm = async (objData) => {}

  const makeBody = () => {
    return (
      <div>
        <p>{contactState?.selectedContact?.firstName} {contactState?.selectedContact?.lastName}</p>
        {contactState?.isLoadingDelete ?
          <LoadingIndicator /> :
          <div>
            <button onClick={() => handleOpenModal()}>
              edit
            </button>

            <button onClick={() => {
              if (window.confirm('Delete?')) {
                deleteContact(contactState?.selectedContact?.id);
              }
            }}>
              delete
            </button>
          </div>}

          <Modal show={isShowModal} handleClose={handleCloseModal}>
            <h4>Edit Contact</h4>
            <FormContact
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
      </div>
    );
  }

  return (
    <div>
      <h1>Detail Contact Page</h1>
      <div>
        <img height={200} src={illustration} alt='illustration' />
      </div>
      {contactState?.isLoadingDetail
        ? <LoadingIndicator />
        : makeBody()}
    </div>
  );
}

export default DetailContactPage;
