import React from "react";
import FormInput from "./FormInput";
import Button from "./Button";
export default function LinkForm({ name, placeholder, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label for={name} className="formcontainer_label">
        {" "}
        {name}{" "}
      </label>
      <FormInput type="url" placeholder={placeholder} name={name} />
      <Button name="submit" type="submit" className="formcontainer_submit" />
    </form>
  );
}
