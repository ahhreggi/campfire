import React from "react";

import { getByText, getByTestId, getByAltText, getByPlaceholderText, prettyDOM, render, cleanup, waitFor, fireEvent, act, queryByText, screen, getByTitle } from "@testing-library/react";

import PostListItem from "../PostListItem";

import {jest} from "@jest/globals";

import * as dummyData from "../../__mocks__/__dummyData";

// import axios from "axios";




afterEach(cleanup);
describe("PostListItem", () => {
  it("renders without crashing", () => {
    const {title, body, tags, views, comments} = dummyData.dummyCourseData.posts[0];
    render(<PostListItem
      title={title}
      body={body}
      tags={tags}
      views={views}
      comments={comments.toArray}
    />);
    expect(screen.getByText(/how do I create/i));
  });

});