import React from "react";
import { render } from "@testing-library/react";
import CommentList from "./CommentList";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <CommentList comments={[]} />
            </UserProvider>
        </MemoryRouter>,
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <CommentList comments={[]} />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});

/* test render fail when not passed in prop */
/* test that an element is renderred */