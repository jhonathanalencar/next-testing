"use client";

import { MultiStepForm } from "./components/multi-step-form.component";

export default function MultiStepFormPage() {
  return (
    <MultiStepForm
      onSubmit={(values) => {
        console.log("Form Submitted", values);
      }}
    />
  );
}
