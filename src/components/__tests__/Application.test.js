import React from "react";

import { getByText, getByTestId, getByAltText, prettyDOM, render, cleanup, waitFor, fireEvent, act, queryByText, screen } from "@testing-library/react";

import userEvent from '@testing-library/user-event'

import App from "../App";

import {jest} from "@jest/globals";

import axios from "axios";

jest.mock('axios')

// jest.unmock("axios");
// axios.defaults.baseURL = "http://localhost:3030/"


beforeEach(async() => {
  render(<App />);
  // waits for loading screen to finish
  await waitFor(() => screen.getByText("Campfire"));
  // clears username and password if entered
  userEvent.clear(screen.getByPlaceholderText("email"))
  userEvent.clear(screen.getByPlaceholderText("password"))
});

afterEach(cleanup);

describe("Application", () => {
  it("Renders", async() => {
    expect(screen.getByText("Campfire")).toBeInTheDocument();
  });

  
  it("Renders with an empty login form", async() => {
    expect(screen.getByPlaceholderText("email")).toHaveValue('')
    expect(screen.getByPlaceholderText("password")).toHaveValue('')

    expect(screen.getByText("Campfire")).toBeInTheDocument();
  });

  it("Renders", async() => {

    userEvent.type(screen.getByPlaceholderText("email"), "hello5@campfire.ca")
    userEvent.type(screen.getByPlaceholderText("password"), "campfire")

    expect(screen.getByPlaceholderText("email")).toHaveValue('hello5@campfire.ca')
    expect(screen.getByPlaceholderText("password")).toHaveValue('campfire')
    // axios.get.mockResolvedValue(() => 
    await axios.mockImplementationOnce(() => Promise.resolve({data:{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjIxMzA1NzI2fQ.qXAE4PTZUagp4bBsB-5St0gVt6xyw60yqP6q_ihEBqI", userID:5, email:"hello5@campfire.ca", firstName:"Dean", lastName:"Wintringham", avatarID:6}}));
    // jest.unmock('axios')
    userEvent.click(screen.getByRole("button", {name: "Login"}))
    // await axios.get.mockImplementation(() => Promise.resolve({data:{userID:5}}))
    await waitFor(() => screen.getByText("Welcome back, Dean!"));

    // await expect(screen.getByText("Welcome back, Dean!")).toBeInTheDocument();
  });

  it("Renders", async() => {

    expect(screen.getByText("Campfire")).toBeInTheDocument();
  });

  it("Renders", async() => {

    expect(screen.getByText("Campfire")).toBeInTheDocument();
  });




  // it("Displays a post when it is clicked", async() => {
  //   fireEvent.click(screen.getByText(/do I create a class/));

  //   expect(screen.getByText(/keyword followed by/)).toBeInTheDocument();
  // });

  // it("Applies filter to postlist when tag is clicked and resets when clear filters is clicked", async() => {
  //   fireEvent.click(screen.getAllByRole("button", {name: /promises/i})[0]);

  //   expect(screen.getByRole("button", {name: /clear filters/i})).toBeInTheDocument();

  //   fireEvent.click(screen.getByRole("button", {name: /clear filters/i}));

  //   expect(screen.getByText(/do I create a class/)).toBeInTheDocument();
  // });

  // it("Goes to analytics and back to dashboard when the buttons are pressed", async() => {
  //   fireEvent.click(screen.getByRole("button", {name: /analytics/i}));

  //   expect(screen.getByText("This is Analytics."));
    
  //   fireEvent.click(screen.getByRole("button", {name: /dashboard/i}));

  //   expect(screen.getByText("This is Dashboard."));
  // });

});