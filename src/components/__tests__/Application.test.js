import React from "react";

import { getByText, getAllByTestId, getByAltText, getByPlaceholderText, prettyDOM, render, cleanup, waitFor, fireEvent, act, queryByText } from "@testing-library/react";

import App from "../App";
import {jest} from "@jest/globals";

// import axios from "axios";
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(cleanup);

describe("Application", () => {
  it("Renders", async() => {
    const { getByText } = render(<App />);

    await waitFor(() => getByText("Campfire"));
  });

});