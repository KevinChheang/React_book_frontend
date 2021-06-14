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