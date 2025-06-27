import * as yup from "yup";

// Validation schema for financing request form
export const financingRequestSchema = yup.object({
  firstName: yup
    .string()
    .label("First Name")
    .required()
    .min(2, ({ label }) => `${label} must be at least 2 characters`)
    .max(100, ({ label }) => `${label} must not exceed 100 characters`)
    .matches(
      /^[a-zA-Z\s]+$/,
      ({ label }) => `${label} can only contain letters and spaces`
    ),
  lastName: yup
    .string()
    .label("Last Name")
    .required()
    .min(2, ({ label }) => `${label} must be at least 2 characters`)
    .max(100, ({ label }) => `${label} must not exceed 100 characters`)
    .matches(
      /^[a-zA-Z\s]+$/,
      ({ label }) => `${label} can only contain letters and spaces`
    ),
  validityStartDate: yup
    .date()
    .label("Validity Start Date")
    .required()
    .test(
      "validityStartDate",
      ({ label }) => `${label} must be at least 15 days from now`,
      (value) => {
        if (!value) return true;
        const minDate = new Date();
        minDate.setDate(minDate.getDate() + 15);
        return value >= minDate;
      }
    ),
  validityEndDate: yup
    .date()
    .label("Validity End Date")
    .required()
    .test(
      "validityEndDate",
      ({ label }) =>
        `${label} must be between 1 and 3 years after Validity Start Date`,
      (value, ctx) => {
        const { validityStartDate } = ctx.parent;
        if (!value && !validityStartDate) return true;

        const minEndDate = new Date(validityStartDate);
        minEndDate.setFullYear(minEndDate.getFullYear() + 1);
        const maxEndDate = new Date(validityStartDate);
        maxEndDate.setFullYear(maxEndDate.getFullYear() + 3);

        return value >= minEndDate && value <= maxEndDate;
      }
    ),
});

export type FinancingRequestFormData = yup.InferType<
  typeof financingRequestSchema
>;
