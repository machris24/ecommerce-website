import React from "react";

// Create a Context Object
// A context object as the name suggests is a data type of an object that can be used to stored information that can be shared to other components within the app.
// Context object is a different approach in passing information between components and allows easier access by avoiding props-drilling.
const UserContext = React.createContext();

// The "Provider" component allows other components to consume/use the context object and supply the necessary information needed to the context object.
export const UserProvider = UserContext.Provider;

export default UserContext;