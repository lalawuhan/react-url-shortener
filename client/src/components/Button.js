import React from "react";
export default function Button({ name, handleClick, type, className }) {
  return (
    <button type={type} onClick={handleClick} className={className}>
      {name}{" "}
    </button>
  );
}
