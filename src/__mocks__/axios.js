'use strict';

const axios = jest.createMockFromModule('axios');

import * as dummyData from "./__dummyData";

export default {
  __esModule: true,
  default: jest.fn(() => Promise.resolve()),
  get: jest.fn(url => {
    if (url === "/api/courses/1") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: dummyData.dummyCourseData
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

  })
};


const API = {
  // GET_COURSES: "/api/courses",
  RESET: "/api/debug/reset_db",

  COURSES: "/api/courses", // data = { state.courseID }

  POSTS: "/api/posts",

  BOOKMARKS: "/api/bookmarks",

  COMMENTS: "/api/comments"

};