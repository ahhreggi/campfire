import React from "react";

import { getByText, getByTestId, getByAltText, getByPlaceholderText, prettyDOM, render, cleanup, waitFor, fireEvent, act, queryByText, screen } from "@testing-library/react";

import App from "../App";

import {jest} from "@jest/globals";

import axios from "axios";

jest.unmock("axios");
axios.defaults.baseURL = "http://localhost:3030/"

import * as dummyData from "../../__mocks__/__dummyData";

beforeEach(async() => {
  jest.useFakeTimers(); // necessary before app tests to bypass loading screen
  
  
  // axios.get = jest.fn().mockResolvedValueOnce(dummyData.dummyCourseData)

  render(<App courseId={2}/>);
  // waits for loading screen to finish
  await waitFor(() => screen.getByText("Campfire"));


});

afterEach(cleanup);

describe("Application", () => {
  it("Renders", async() => {

    expect(screen.getByText("Campfire")).toBeInTheDocument();
  });

  it("Displays a post when it is clicked", async() => {
    fireEvent.click(screen.getByText(/do I create a class/));

    expect(screen.getByText(/keyword followed by/)).toBeInTheDocument();
  });

  it("Applies filter to postlist when tag is clicked and resets when clear filters is clicked", async() => {
    fireEvent.click(screen.getAllByRole("button", {name: /promises/i})[0]);

    expect(screen.getByRole("button", {name: /clear filters/i})).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", {name: /clear filters/i}));

    expect(screen.getByText(/do I create a class/)).toBeInTheDocument();
  });

  it("Goes to analytics and back to dashboard when the buttons are pressed", async() => {
    fireEvent.click(screen.getByRole("button", {name: /analytics/i}));

    expect(screen.getByText("This is Analytics."));
    
    fireEvent.click(screen.getByRole("button", {name: /dashboard/i}));

    expect(screen.getByText("This is Dashboard."));
  });

});