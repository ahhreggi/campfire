import * as dummyData from "./dummyData";

export default {
  default: { baseURL: ""},
  get: jest.fn(url => {
    if (url === "/api/days") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: data
      });
    }

  }),
  put: jest.fn(url => {
    if (url === "/api/days") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: data
      });
    }

  }),
  delete: jest.fn(url => {
    if (url === "/api/days") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: data
      });
    }

  }),

}