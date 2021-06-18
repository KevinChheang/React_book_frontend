import React from "react";
import { render } from "@testing-library/react";
import BookCard from "./BookCard";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <BookCard />
            </UserProvider>
        </MemoryRouter>,
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <BookCard />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
