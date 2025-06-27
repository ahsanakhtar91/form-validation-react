import "./FinancingRequestForm.css";
import React from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  financingRequestSchema,
  FinancingRequestFormData,
} from "../../schemas/financingRequestSchema";
import { FormInput } from "../FormInput/FormInput";

const FinancingRequestForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FinancingRequestFormData>({
    resolver: yupResolver(financingRequestSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = (data: FinancingRequestFormData) => {
    console.log("Form Submitted:", data);
    // Handle form submission here
    reset();
  };

  return (
    <div className="form-container">
      <h2>Financing Request Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="firstName"
          label="First Name"
          type="text"
          control={control}
          errors={errors}
        />
        <FormInput
          name="lastName"
          label="Last Name"
          type="text"
          control={control}
          errors={errors}
        />
        <Button htmlType="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </div>
  );
};

export default FinancingRequestForm;
