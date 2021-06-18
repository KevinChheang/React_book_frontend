import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BookList from "./BookList";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <BookList />
            </UserProvider>
        </MemoryRouter>,
    );
  });

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <BookList />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
