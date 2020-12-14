import React from "react";

// define property and setter here in case there's a need for currentUser to be updated
// from a child components in the future.
const CurrentUserContext = React.createContext({
  currentUser: "",
  setCurrentUser: () => { }
});
export default CurrentUserContext;
