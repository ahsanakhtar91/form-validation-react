import "./FormDropdown.css";
import { FinancingRequestFormData } from "../../schemas/financingRequestSchema";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Select } from "antd";
import { ComponentProps } from "react";

type FormDropdownProps = {
  name: keyof FinancingRequestFormData;
  label: string;
  options: ComponentProps<typeof Select>["options"];
  placeholder?: string;
  control: Control<FinancingRequestFormData>;
  errors: FieldErrors<FinancingRequestFormData>;
};

export const FormDropdown = ({
  name,
  label,
  options = [],
  placeholder,
  control,
  errors,
}: FormDropdownProps) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <div className="form-input-label">{label}</div>
            <Select
              {...field}
              placeholder={placeholder ?? `Select ${label}`}
              status={errors[name] ? "error" : ""}
              className="form-input"
              options={options}
              showSearch
              allowClear
            />
          </div>
        )}
      />
      {errors[name] && (
        <div className="error-message">{errors[name]?.message}</div>
      )}
    </div>
  );
};
