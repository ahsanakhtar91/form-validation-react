import "./FinancingRequestForm.css";
import React from "react";
import { Input, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
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
      fullName: "",
    },
  });

  const onSubmit = (data: FinancingRequestFormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
    alert("Form submitted successfully!");
    reset();
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="fullName"
          label="Full Name"
          type="text"
          control={control}
          errors={errors}
        />
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          size="large"
        >
          Submit Request
        </Button>
      </form>
    </div>
  );
};

export default FinancingRequestForm;
