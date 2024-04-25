"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(2, "Name is invalid"),
  lastName: z.string().trim().min(2, "Last name is invalid"),
});

export type FormSchemaType = z.infer<typeof formSchema>;

interface FormProps {
  handleSubmitForm: (data: FormSchemaType) => void;
}

export function Form({ handleSubmitForm }: FormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormSchemaType>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastName: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <input
        type="text"
        placeholder="Name"
        aria-label="Name"
        {...register("name")}
      />
      {errors.name && <p>{errors.name.message}</p>}

      <input
        type="text"
        placeholder="Last Name"
        aria-label="Last Name"
        {...register("lastName")}
      />
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
