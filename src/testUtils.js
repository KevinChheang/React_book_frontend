import React from "react";
import UserContext from "./auth/UserContext";

const demoUser = {
  username: "testuser",
  firstName: "testfirst",
  lastName: "testlast",
  email: "test@gmail.com",
};

const UserProvider =
    ({ children, currentUser = demoUser, hasAddedBook = () => false }) => (
    <UserContext.Provider value={{ currentUser, hasAddedBook }}>
      {children}
    </UserContext.Provider>
);

export { UserProvider };
