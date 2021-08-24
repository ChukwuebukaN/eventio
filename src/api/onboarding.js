import {eventioApi} from '../config';

// eslint-disable-next-line
export default {
  /** Send a POST request to Sign In User */
  SignIn: async function (email, password) {
    let data = {
      'email': email,
      'password': password
    }
    const fd = JSON.stringify(data);

    return await eventioApi.post('auth/native', fd);
  },
  /** Send a POST request to get Refresh Token */
  GetToken: async function (refreshToken) {
    let data = {
      'refreshToken': refreshToken
    }
    const fd = JSON.stringify(data);

    return await eventioApi.post('auth/native', fd);
  },
  /** Send a POST request to Sign Up User */
  SignUp: async function (firstName, lastName, email, password) {
    let data = {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'password': password
    }
    const fd = JSON.stringify(data);
    return await eventioApi.post('users', fd);
  }
};
