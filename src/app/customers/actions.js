"use server"; // make this a server action

import { neon } from "@neondatabase/serverless";

export async function createCustomer(prevState, formData) {
  try {
    // 1. Connect to the Neon database
    const sql = neon(`${process.env.DATABASE_URL}`);

    // 2. Retrieve form data that we want to store
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const wantsUpdates = Boolean(formData.get("wantsUpdates"));
    const phone = formData.get("phone");
    const password = formData.get("password");


    // 3. Validate and/or sanitize the provided data
    let birthYear = 10;
    if (
      birthYear < new Date().getFullYear() - 130 &&
      birthYear > new Date().getFullYear()
    ) {
      throw new Error("Invalid birth year");
    }

    // 1. We want to validate that all first names are 50 characters or less. If a first name is greater than 50 characters, throw a new error with message "First names must be 50 characters or less."
    if (firstName.length > 50) {
      throw new Error("First names must be 50 characters or less.");
    }

    // 2. We want to validate that emails contain an '@' symbol. If the '@' symbol is not detected, throw a new error with the message, "Please provide a valid email address." Bonus: If you want to take it a step further, you can also check that there is a period after the '@' symbol.
    if (!email.includes("@") || !email.slice(email.indexOf("@")).includes(".")) {
      throw new Error("Please provide a valid email address.");
    }

    // The following pattern makes sure that the phone number includes a group of 3 digits, another group of 3 digits, and then one group of four digits, regardless of what is before, between, or after them
    //    123       456       7890
    if (phone && !/[0-9]{3}.*[0-9]{3}.*[0-9]{4}/.test(phone)) {
      throw new Error("Please provide a valid phone number.");
    }

    // Check that a password has:
    // 1. A digit
    // 2. A capital letter
    // 3. A lowercase letter
    // 4. A special character
    // 5. Is at least 8 characters long
    // 6. Does not include spaces
    if (
      !/[0-9]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[!@#$%^&*()_+`~;:'",./<>?\[\]{}\|\\]/.test(password) ||
      /\s/.test(password) ||
      password.length < 8
    ) {
      throw new Error("Please provide a valid password.");
    }

    // 4. Insert the customer from the form into the Postgres database
    await sql`
      INSERT INTO customers 
      (firstName, lastName, email, wantsUpdates, phone, password) 
      VALUES (${firstName}, ${lastName}, ${email}, ${wantsUpdates}, ${phone}, ${password})`;
  } catch(error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
    errors: null,
  };
}
