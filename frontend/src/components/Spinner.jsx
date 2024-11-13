import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-solid border-sky-800 rounded-full" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
