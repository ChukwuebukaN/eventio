import {eventioApi} from '../config';

// eslint-disable-next-line
export default {
  /** Send a GET request to get List of Events */
  listOfEvents: async function () {
    return await eventioApi.get('/events');
  },
    /** Send a POST request to Create New Event */
  CreateEvent: async function (title, description, startsAt, capacity) {
    let data = {
      'title': title,
      'description': description,
      'startsAt': startsAt,
      'capacity': capacity
    }
    const fd = JSON.stringify(data);
    console.log('👍 DATA SENT')
    return await eventioApi.post('events', fd);
  }
};
