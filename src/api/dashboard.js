import axios from "axios";
import { eventioApi } from "../config";
import authHandler from "../authHandler";

// eslint-disable-next-line
export default {
  /** Send a GET request to get List of Events */
  listOfEvents: async function () {
    return await eventioApi.get("/events");
  },
  /** Send a POST request to Create New Event */
  JoinEvent: async function (id) {
    let accessToken = authHandler.get();

    return await axios.post(
      `https://testproject-api-v2.strv.com/events/${id}/attendees/me`,
      {
        headers: {
          "Content-Type": "application/json",
          APIKey: "8bbe1daa454b5960bd6fadc10b9ac1220771110d",
          Authorization: accessToken,
        },
      }
    );
  },
  /** Send a POST request to Create New Event */
  CreateEvent: async function (title, description, capacity) {
    let accessToken = authHandler.get();
    let data = {
      title: title,
      description: description,
      startsAt: "2021-12-18T09:57:19.956Z",
      capacity: capacity,
    };
    const fd = JSON.stringify(data);

    return await axios.post("https://testproject-api-v2.strv.com/events", fd, {
      headers: {
        "Content-Type": "application/json",
        APIKey: "8bbe1daa454b5960bd6fadc10b9ac1220771110d",
        Authorization: accessToken,
      },
    });
  },
  /** Send a PATCH request to Edit Event */
  EditEvent: async function (title, description, capacity, id) {
    let accessToken = authHandler.get();
    let data = {
      title: title,
      description: description,
      startsAt: "2021-12-18T09:57:19.956Z",
      capacity: capacity,
    };
    const fd = JSON.stringify(data);

    return await axios.patch(
      `https://testproject-api-v2.strv.com/events${id}`,
      fd,
      {
        headers: {
          "Content-Type": "application/json",
          APIKey: "8bbe1daa454b5960bd6fadc10b9ac1220771110d",
          Authorization: accessToken,
        },
      }
    );
  },
  /** Send a DELETE request to Delete Event */
  DeleteEvent: async function (title, description, capacity, id) {
    let accessToken = authHandler.get();
    let data = {
      title: title,
      description: description,
      startsAt: "2021-12-18T09:57:19.956Z",
      capacity: capacity,
    };
    const fd = JSON.stringify(data);

    return await axios.delete(
      `https://testproject-api-v2.strv.com/events${id}`,
      fd,
      {
        headers: {
          "Content-Type": "application/json",
          APIKey: "8bbe1daa454b5960bd6fadc10b9ac1220771110d",
          Authorization: accessToken,
        },
      }
    );
  },
};
