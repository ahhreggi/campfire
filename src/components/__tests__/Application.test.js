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
    // waits for loading screen to finish
    await waitFor(() => screen.getByText("Campfire"));

    expect(screen.getByText("Campfire")).toBeInTheDocument();
  });

  it("Displays a post when it is clicked", async() => {
    render(<App />);

    await waitFor(() => screen.getByText("Campfire"));

    fireEvent.click(screen.getByText(/do I create a class/));

    expect(screen.getByText(/keyword followed by/)).toBeInTheDocument();
  });

  it("Applies filter to postlist when tag is clicked and resets when clear filters is clicked", async() => {
    render(<App />);

    await waitFor(() => screen.getByText("Campfire"));

    fireEvent.click(screen.getAllByRole('button', {name: /promises/i})[0]);

    expect(screen.getByRole('button', {name: /clear filters/i})).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: /clear filters/i}));

    expect(screen.getByText(/do I create a class/)).toBeInTheDocument();
  });

});