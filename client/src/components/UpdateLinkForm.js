import React from "react";
import FormInput from "./FormInput";
import Button from "./Button";
export default function UpdateLinkForm({ placeholder, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <FormInput
        type="url"
        placeholder={placeholder}
        name="url"
        className="update-input"
      />
      <Button name="Update" type="submit" />
    </form>
  );
}
