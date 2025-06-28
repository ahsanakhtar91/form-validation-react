import "./FormInput.css";
import { FinancingRequestFormData } from "../../schemas/financingRequestSchema";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Input, DatePicker, InputNumber } from "antd";

type FormInputProps = {
  name: keyof FinancingRequestFormData;
  label: string;
  type: "text" | "date" | "number" | "textarea";
  placeholder?: string;
  disabled?: boolean;
  control: Control<FinancingRequestFormData>;
  errors: FieldErrors<FinancingRequestFormData>;
};

export const FormInput = ({
  name,
  label,
  type,
  placeholder,
  disabled,
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
                placeholder={placeholder ?? `Pick ${label}`}
                disabled={disabled}
                className="form-input"
                allowClear
              />
            ) : type === "number" ? (
              <InputNumber
                {...field}
                status={errors[name] ? "error" : ""}
                placeholder={placeholder ?? `Enter ${label}`}
                disabled={disabled}
                className="form-input"
                value={field.value as number}
                min={0}
                step={1}
                precision={2}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => Number(value?.replace(/\$\s?|(,*)/g, ""))}
              />
            ) : type === "textarea" ? (
              <Input.TextArea
                {...field}
                status={errors[name] ? "error" : ""}
                placeholder={placeholder ?? `Enter ${label}`}
                disabled={disabled}
                className="form-input"
                value={field.value as string}
                rows={3}
                allowClear
              />
            ) : (
              <Input
                {...field}
                type={type}
                status={errors[name] ? "error" : ""}
                placeholder={placeholder ?? `Enter ${label}`}
                disabled={disabled}
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
