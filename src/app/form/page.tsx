"use client";

import { Form, FormSchemaType } from "./components/form.component";

export default function FormPage() {
  async function handleSubmitForm(data: FormSchemaType) {
    console.log(data);
  }

  return (
    <div>
      <h2>Form TDD</h2>
      <Form handleSubmitForm={handleSubmitForm} />
    </div>
  );
}
