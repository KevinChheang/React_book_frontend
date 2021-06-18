import React from "react";
import { render } from "@testing-library/react";
import FavBookList from "./FavBookList";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <FavBookList />
            </UserProvider>
        </MemoryRouter>,
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <FavBookList />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});

/* test add book here
then test fav book list has remove button */