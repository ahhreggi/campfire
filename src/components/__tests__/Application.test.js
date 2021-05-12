import React from "react";

import { getByText, getByTestId, getByAltText, getByPlaceholderText, prettyDOM, render, cleanup, waitFor, fireEvent, act, queryByText, screen } from "@testing-library/react";

import App from "../App";

import {jest} from "@jest/globals";

// import axios from "axios";


beforeEach(() => {
  jest.useFakeTimers(); // necessary before app tests to bypass loading screen
});

afterEach(cleanup);

describe("Application", () => {
  it("Renders", async() => {
    render(<App />);

    await waitFor(() => screen.getByText("Campfire"));

    expect(screen.getByText("Campfire")).toBeInTheDocument();
  });

  it("Displays a post when it is clicked", async() => {
    render(<App />);

    await waitFor(() => screen.getByText("Campfire"));

    await fireEvent.click(screen.getByText(/do I create a class/));

    expect(screen.getByText(/keyword followed by/)).toBeInTheDocument();
  });




});