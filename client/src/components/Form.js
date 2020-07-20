import React from "react";
import FormInput from "./FormInput";
import Button from "./Button";
export default function Form({ name, type, placeholder, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label className="formcontainer_label"> {name} </label>
      <FormInput type={type} placeholder={placeholder} />
      <Button name="submit" type="submit" className="formcontainer_submit" />
    </form>
  );
}
