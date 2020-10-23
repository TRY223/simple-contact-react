import axios from 'axios'

const BASE_URL = 'https://simple-contact-crud.herokuapp.com'

export const getAllContacts = () => {
  return new Promise(async (resolve, reject) => {
    try {

      const response = await axios({
        method: 'GET',
        url: `${BASE_URL}/contact`
      })

      resolve(response)

    } catch (error) {
      reject(error)
    }
  })
}

export const getContactById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {

      const response = await axios({
        method: 'GET',
        url: `${BASE_URL}/contact/${id}`
      })

      resolve(response)

    } catch (error) {
      reject(error)
    }
  })
}

export const createContact = (objContact) => {
  return new Promise(async (resolve, reject) => {
    try {

      const response = await axios({
        method: 'POST',
        url: `${BASE_URL}/contact`,
        data: objContact
      })

      resolve(response)

    } catch (error) {
      reject(error)
    }
  })
}

export const deleteContactById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {

      const response = await axios({
        method: 'DELETE',
        url: `${BASE_URL}/contact/${id}`
      })

      resolve(response)

    } catch (error) {
      reject(error)
    }
  })
}
