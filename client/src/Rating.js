import React from "react";

const Rating = ({ rating }) => {
  const calcRating = () => {
    let stars = "";
    for (let i = 1; i <= rating; i++) {
      stars += "💖";
    }

    return stars;
  };

  return <span>{calcRating()}</span>;
};

export default Rating;
