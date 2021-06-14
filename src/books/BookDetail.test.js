import React from "react";
import { render } from "@testing-library/react";
import BookDetail from "./BookDetail";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <BookDetail />
            </UserProvider>
        </MemoryRouter>,
    );
  });