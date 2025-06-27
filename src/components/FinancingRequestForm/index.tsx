import "./styles.css";
import React from "react";
import { Input, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  financingRequestSchema,
  FinancingRequestFormData,
} from "../../schemas/financingRequestSchema";

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
        <div>
          <label>Full Name</label>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <div>
                <Input
                  status={errors.fullName ? "error" : ""}
                  {...field}
                  className="input"
                />

                {errors.fullName && <span>{errors.fullName.message}</span>}
              </div>
            )}
          />
        </div>
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          size="large"
          style={{ width: "100%" }}
        >
          Submit Request
        </Button>
      </form>
    </div>
  );
};

export default FinancingRequestForm;
