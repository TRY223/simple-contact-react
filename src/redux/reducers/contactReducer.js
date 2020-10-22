import { ADD_CONTACT, LOAD_CONTACTS_SUCCESS, LOAD_CONTACTS_FAILURE, LOADING, LOAD_DETAIL_CONTACT_SUCCESS, LOAD_DETAIL_CONTACT_FAILURE, LOADING_DETAIL_CONTACT } from '../actions/contactAction/contactActionTypes';

export const contactInitialState = {
  contacts: [],
  selectedContact: null,
  isLoading: false,
  isLoadingDetail: false,
  errorMessage: null,
  errorMessageDetail: null
}

export default (state=contactInitialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };

    case LOAD_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload,
        isLoading: false
      };

    case LOAD_CONTACTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      };

    case LOADING:
      return {
        ...state,
        isLoading: true
      }

    case LOAD_DETAIL_CONTACT_SUCCESS:
      return {
        ...state,
        selectedContact: action.payload,
        isLoadingDetail: false
      };

    case LOAD_DETAIL_CONTACT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessageDetail: action.payload
      };

    case LOADING_DETAIL_CONTACT:
      return {
        ...state,
        isLoadingDetail: true
      }
  
    default:
      return state;
  }
}
