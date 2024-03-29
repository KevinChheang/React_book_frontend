import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router";

it("renders without crashing", function () {
  render(
      <MemoryRouter>
            <LoginForm />
      </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});

it("has submit button", function () {
  const { queryByText } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
  );

  const submitBtn = queryByText("Submit");
  
  expect(submitBtn).toHaveTextContent("Submit");
});