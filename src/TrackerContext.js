import React from "react";

const TrackerContext = React.createContext({
  trackerItems: [],
  setTrackerItems: () => {},
});
export const TrackerProvider = TrackerContext.Provider;
export default TrackerContext;
