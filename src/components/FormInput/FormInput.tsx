import "./FormInput.css";
import { FinancingRequestFormData } from "../../schemas/financingRequestSchema";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Input } from "antd";

type FormInputProps = {
  name: keyof FinancingRequestFormData;
  label: string;
  type: string;
  control: Control<FinancingRequestFormData>;
  errors: FieldErrors<FinancingRequestFormData>;
};

export const FormInput = ({
  name,
  label,
  type,
  control,
  errors,
}: FormInputProps) => {
  return (
    <div>
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <Input
              type={type}
              status={errors.fullName ? "error" : ""}
              {...field}
              className="form-input"
            />

            {errors.fullName && <span>{errors.fullName.message}</span>}
          </div>
        )}
      />
    </div>
  );
};
