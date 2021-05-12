import React from "react";

import { getByText, getByTestId, getByAltText, getByPlaceholderText, prettyDOM, render, cleanup, waitFor, fireEvent, act, queryByText, screen, getByTitle } from "@testing-library/react";

import PostListItem from "../PostListItem";

import {jest} from "@jest/globals";

import * as dummyData from "../../__mocks__/__dummyData";

// import axios from "axios";

afterEach(cleanup);
describe("PostListItem", () => {
  const {title, body, tags} = dummyData.dummyCourseData.posts[0];
  
  it("renders without crashing", () => {
    render(<PostListItem
      title={"Test Post!"}
      tags={[]}
    />);
    expect(screen.getByText("Test Post!"));
  });
  
  it("Displays a promise tag when it is included in the props ", () => {
    render(<PostListItem
      title={title}
      body={body}
      tags={[{
        "id": 3,
        "name": "Promises"
      }]}
      views={5}
      comments={5}
    />);
    expect(screen.getByRole("button", /promise/i));
  });
  
  it("correctly counts views and comments", () => {
    render(<PostListItem
      title={title}
      body={body}
      tags={tags}
      views={5}
      comments={10}
    />);
    expect(screen.getByText("5"));
    expect(screen.getByText("10"));
  });
    
  it("Displays a count of 0 when views are 0", () => {
    render(<PostListItem
      title={title}
      body={body}
      tags={tags}
      views={0}
      comments={1}
    />);
    expect(screen.getByText("0"));
  });

  it("Displays a count of 0 when comments are 0", () => {
    render(<PostListItem
      title={title}
      body={body}
      tags={tags}
      views={1}
      comments={0}
    />);
    expect(screen.getByText("0"));
  });

});