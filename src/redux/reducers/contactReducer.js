import { ADD_CONTACT, ADD_CONTACT_FAILURE, LOADING_ADD_CONTACT, LOAD_CONTACTS_SUCCESS, LOAD_CONTACTS_FAILURE, LOADING, LOAD_DETAIL_CONTACT_SUCCESS, LOAD_DETAIL_CONTACT_FAILURE, LOADING_DETAIL_CONTACT, LOADING_DELETE_CONTACT, DELETE_CONTACT_SUCCESS, DELETE_CONTACT_FAILURE } from '../actions/contactAction/contactActionTypes';

export const contactInitialState = {
  contacts: [],
  selectedContact: null,
  isLoading: false,
  isLoadingDetail: false,
  isLoadingAddContact: false,
  isLoadingDelete: false,
  errorMessage: null,
  errorMessageDetail: null,
  errorMessageAddContact: null,
  errorMessageDelete: null
}

export let contactLastState = { ...contactInitialState };

export default (state=contactInitialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      contactLastState = {
        ...state,
        contacts: [...state.contacts, action.payload],
        isLoadingAddContact: false
      };
      return contactLastState;

    case ADD_CONTACT_FAILURE:
      contactLastState = {
        ...state,
        errorMessageAddContact: action.payload,
        isLoadingAddContact: false
      };
      return contactLastState;

    case LOAD_CONTACTS_SUCCESS:
      contactLastState = {
        ...state,
        contacts: action.payload,
        isLoading: false
      };
      return contactLastState;

    case LOAD_CONTACTS_FAILURE:
      contactLastState = {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      };
      return contactLastState;

    case LOADING:
      contactLastState = {
        ...state,
        isLoading: true
      };
      return contactLastState;

    case LOAD_DETAIL_CONTACT_SUCCESS:
      contactLastState = {
        ...state,
        selectedContact: action.payload,
        isLoadingDetail: false
      };
      return contactLastState;

    case LOAD_DETAIL_CONTACT_FAILURE:
      contactLastState = {
        ...state,
        isLoading: false,
        errorMessageDetail: action.payload
      };
      return contactLastState;

    case LOADING_DETAIL_CONTACT:
      contactLastState = {
        ...state,
        isLoadingDetail: true
      };
      return contactLastState;

    case LOADING_ADD_CONTACT:
      contactLastState = {
        ...state,
        isLoadingAddContact: true
      };
      return contactLastState;

    case LOADING_DELETE_CONTACT:
      contactLastState = {
        ...state,
        isLoadingDelete: true
      };
      return contactLastState;

    case DELETE_CONTACT_SUCCESS:
      contactLastState = {
        ...state,
        contacts: state.contacts.filter((d) => d.id !== action.payload),
        isLoadingDelete: false
      };
      return contactLastState;

    case DELETE_CONTACT_FAILURE:
      contactLastState = {
        ...state,
        errorMessageDelete: action.payload,
        isLoadingDelete: false
      };
      return contactLastState;
  
    default:
      return state;
  }
}
