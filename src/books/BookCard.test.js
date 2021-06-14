import React from "react";
import { render } from "@testing-library/react";
import BookCard from "./BookCard";
import { MemoryRouter } from "react-router";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <BookCard />
        </MemoryRouter>,
    );
  });

it("matches snapshot", function () {
const { asFragment } = render(
    <MemoryRouter initialEntries={["/company/ibm"]}>
        <UserProvider>
        <Route path="/company/:handle">
            <Company />
        </Route>
        </UserProvider>
    </MemoryRouter>,
);
expect(asFragment()).toMatchSnapshot();
});