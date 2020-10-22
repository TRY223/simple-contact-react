import { ADD_CONTACT, LOAD_CONTACTS_SUCCESS, LOAD_CONTACTS_FAILURE, LOADING, LOAD_DETAIL_CONTACT_SUCCESS, LOAD_DETAIL_CONTACT_FAILURE, LOADING_DETAIL_CONTACT } from './contactActionTypes';

export const addContact = (objContact) => ({
  type: ADD_CONTACT,
  payload: objContact
});

export const loadContactsSuccess = (arrContact) => ({
  type: LOAD_CONTACTS_SUCCESS,
  payload: arrContact
});

export const loadContactsFailure = (errorMessage) => ({
  type: LOAD_CONTACTS_FAILURE,
  payload: errorMessage
});

export const startLoadContacts = () => ({
  type: LOADING
})

export const startLoadDetailContact = () => ({
  type: LOADING_DETAIL_CONTACT
})

export const loadDetailContactSuccess = (objContact) => ({
  type: LOAD_DETAIL_CONTACT_SUCCESS,
  payload: objContact
});

export const loadDetailContactFailure = (errorMessage) => ({
  type: LOAD_DETAIL_CONTACT_FAILURE,
  payload: errorMessage
});
