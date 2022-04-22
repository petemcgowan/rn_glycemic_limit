import TrackerContext from "../TrackerContext";
import React, { useContext } from "react";

export const getGLResult = (carbs_per_100g, gi) => {
  const carbsRatio = +carbs_per_100g / 100;
  const unit = "g"; // hard coding for now
  const servingFactor = { g: 1, oz: 28.3495231 }[unit];
  const serving = 100; // hard coding for now

  let gl = (gi * serving * carbsRatio * servingFactor) / 100;
  gl = Math.round(gl * 100) / 100; //round 2 decimals

  return gl;
};

// Total Carbs: calculated
export const getTotalCarbs = () => {
  const { trackerItems } = useContext(TrackerContext);
  let totalCarbs = 0;
  trackerItems.map((trackerItem) => {
    totalCarbs += trackerItem.carbs_per_100g;
  });

  return totalCarbs;
};

export const getTotalGILoad = () => {
  const { trackerItems } = useContext(TrackerContext);
  let totalGILoad = 0;
  trackerItems.map((trackerItem) => {
    totalGILoad += trackerItem.gl;
  });

  return totalGILoad;
};
