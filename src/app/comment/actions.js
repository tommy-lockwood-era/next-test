"use server";

import { neon } from "@neondatabase/serverless";

export async function create(formData) {
  // 1. Connect to the Neon database
  const sql = neon(`${process.env.DATABASE_URL}`);
  // 2. Retrieve form data that we want to store
  const comment = formData.get("comment");
  // 3. Validate and/or sanitize the provided data
  let birthYear = 10;
  if (
    birthYear < new Date().getFullYear() - 130 &&
    birthYear > new Date().getFullYear()
  ) {
    throw new Error("Invalid birth year");
  }
  // 4. Insert the comment from the form into the Postgres database
  await sql`INSERT INTO comments (comment) VALUES (${comment})`;
}
