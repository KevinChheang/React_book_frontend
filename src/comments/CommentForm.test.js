import React from "react";
import { render } from "@testing-library/react";
import CommentForm from "./CommentForm";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <CommentForm />
            </UserProvider>
        </MemoryRouter>,
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <CommentForm />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});

/* test that an element is renderred */