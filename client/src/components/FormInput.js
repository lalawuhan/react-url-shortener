import React, { useState } from "react";

export default function FormInput({ type, placeholder }) {
  const [inputValue, setInputValue] = useState("");

  function handleChange(event) {
    setInputValue(event.target.value);
  }
  return (
    <>
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </>
  );
}
