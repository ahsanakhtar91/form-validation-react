import "./FormInput.css";
import { FinancingRequestFormData } from "../../schemas/financingRequestSchema";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Input, Row } from "antd";

type FormInputProps = {
  name: keyof FinancingRequestFormData;
  label: string;
  type: string;
  placeholder?: string;
  control: Control<FinancingRequestFormData>;
  errors: FieldErrors<FinancingRequestFormData>;
};

export const FormInput = ({
  name,
  label,
  type,
  placeholder,
  control,
  errors,
}: FormInputProps) => {
  const error = errors[name];

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <div className="form-input-label">{label}</div>
            <Input
              type={type}
              status={errors[name] ? "error" : ""}
              placeholder={placeholder ?? label}
              className="form-input"
              {...field}
            />
          </div>
        )}
      />

      {error && <div className="error-message">{error.message}</div>}
    </div>
  );
};
