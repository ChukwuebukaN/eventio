import {eventioApi} from '../config';

// eslint-disable-next-line
export default {
  /** Send a GET request to get List of Events */
  listOfEvents: async function () {
    return await eventioApi.get('/events');
  }
};
