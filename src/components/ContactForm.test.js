import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ContactForm from "./ContactForm";

test("renders correctly", () => {
    render(<ContactForm />);
  });

  test("name entered", ()=>{
      const{getByPlaceholderText} = render(<ContactForm/>);
      const nameInput = getByPlaceholderText("bill");
      fireEvent.change(nameInput);
  })