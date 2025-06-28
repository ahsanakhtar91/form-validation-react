import "./FormInput.css";
import { FinancingRequestFormData } from "../../schemas/financingRequestSchema";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Input, DatePicker } from "antd";

type FormInputProps = {
  name: keyof FinancingRequestFormData;
  label: string;
  type: "text" | "date";
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
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <div className="form-input-label">{label}</div>
            {type === "date" ? (
              <DatePicker
                {...field}
                status={errors[name] ? "error" : ""}
                placeholder={placeholder ?? label}
                className="form-input"
                allowClear
              />
            ) : (
              <Input
                {...field}
                type={type}
                status={errors[name] ? "error" : ""}
                placeholder={placeholder ?? label}
                className="form-input"
                value={field.value as string}
                allowClear
              />
            )}
          </div>
        )}
      />
      {errors[name] && (
        <div className="error-message">{errors[name]?.message}</div>
      )}
    </div>
  );
};
