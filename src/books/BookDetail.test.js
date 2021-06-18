import React from "react";
import { render, fireEvent } from "@testing-library/react";
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

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <BookDetail />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});

it("works when you click add", function() {
    const {queryByText, asFragment} = render(
        <MemoryRouter>
            <UserProvider>
                <BookDetail />
            </UserProvider>
        </MemoryRouter>,
    );

    const addBtn = queryByText("Add");

    // console.log("btn" , addBtn);
    // console.log("fragment" , asFragment());

    // fireEvent.click(addBtn);

    expect(addBtn).toHaveTextContent("Added");
});