import * as yup from "yup";

// Validation schema for financing request form
export const financingRequestSchema = yup
  .object({
    firstName: yup
      .string()
      .required("First Name is required")
      .min(2, "First Name must be at least 2 characters")
      .max(100, "First Name must not exceed 100 characters")
      .matches(
        /^[a-zA-Z\s]+$/,
        "First Name can only contain letters and spaces"
      ),
    lastName: yup
      .string()
      .required("Last Name is required")
      .min(2, "Last Name must be at least 2 characters")
      .max(100, "Last Name must not exceed 100 characters")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Last Name can only contain letters and spaces"
      ),
  })
  .required();

export type FinancingRequestFormData = yup.InferType<
  typeof financingRequestSchema
>;
