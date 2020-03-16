import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ContactForm from "./ContactForm";

test("renders ContactForm without crashing", () => {
  render(<ContactForm />);
});

test('input[name="firstName"] should have placeholder "bill"', () => {
  const { getByPlaceholderText } = render(<ContactForm />);
  const input = getByPlaceholderText(/bill$/i);
  expect(input).toBeInTheDocument();
});

test('ContactForm sets new contact to data', async () => {
  const { getByLabelText, findByText, getByTestId } = render(<ContactForm />);

  const firstNameInput = getByLabelText(/first name*/i);
  const lastNameInput = getByLabelText(/last name*/i);
  const emailInput = getByLabelText(/email*/i);
  const messageInput = getByLabelText(/message/i);

  fireEvent.change(firstNameInput, {
    target: {
      name: 'firstName',
      value: 'John'
    }
  });

  fireEvent.change(lastNameInput, {
    target: {
      name: 'lastName',
      value: 'Doe'
    }
  });

  fireEvent.change(emailInput, {
    target: {
      name: 'email',
      value: 'myemail@gmail.com'
    }
  });

  fireEvent.change(messageInput, {
    target: {
      name: 'message',
      value: 'This is a message'
    }
  });

  const submitBtn = getByTestId(/submitBtn/i);
  fireEvent.click(submitBtn);

  await findByText(/john/i);
  await findByText(/doe/i);
  await findByText(/myemail@gmail.com/i);
  await findByText(/this is a message/i);

});

test('ContactForm should display errors if required fields aren\'t filled out', async () => {
  const { findAllByText, getByTestId } = render(<ContactForm />);
  const submitBtn = getByTestId(/submitBtn/i);
  fireEvent.click(submitBtn);

  const errors = await findAllByText(/Looks like there was an error: required/i);
  expect(errors).toHaveLength(3);
});



