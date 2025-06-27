import * as yup from 'yup';

// Validation schema for financing request form
export const financingRequestSchema = yup.object({
  fullName: yup
    .string()
    .required('Full Name is required')
    .min(2, 'Full Name must be at least 2 characters')
    .max(100, 'Full Name must not exceed 100 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Full Name can only contain letters and spaces'),
}).required();

export type FinancingRequestFormData = yup.InferType<typeof financingRequestSchema>; 