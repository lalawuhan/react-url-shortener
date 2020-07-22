import React from "react";

export default function FormInput({ type, placeholder, name, className }) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className={className}
      />
    </>
  );
}
