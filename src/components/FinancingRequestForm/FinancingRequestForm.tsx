import "./FinancingRequestForm.css";
import React, { useCallback, useEffect, useMemo } from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  financingRequestSchema,
  FinancingRequestFormData,
} from "../../schemas/financingRequestSchema";
import { FormInput } from "../FormInput/FormInput";
import { FormDropdown } from "../FormDropdown/FormDropdown";
import {
  allCountries,
  currencies,
  inputFieldLabels,
  opecCountries,
} from "../../constants/constants";

const FinancingRequestForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FinancingRequestFormData>({
    resolver: yupResolver(financingRequestSchema),
    defaultValues: {
      firstName: undefined,
      lastName: undefined,
      originCountry: undefined,
      currency: undefined,
      validityStartDate: undefined,
      validityEndDate: undefined,
    },
  });

  const onSubmit = useCallback(
    (data: FinancingRequestFormData) => {
      console.log("Form Submitted:", data);
      // Handle form submission here
      reset();
    },
    [reset]
  );

  const originCountry = watch("originCountry");

  useEffect(() => {
    if (opecCountries.includes(originCountry)) {
      setValue("currency", "USD");
    }
  }, [originCountry, setValue]);

  const commonProps = useMemo(
    () => ({
      control,
      errors,
    }),
    [control, errors]
  );

  return (
    <div className="form-container">
      <h2>Financing Request Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="firstName"
          label={inputFieldLabels["firstName"]}
          type="text"
          {...commonProps}
        />
        <FormInput
          name="lastName"
          label={inputFieldLabels["lastName"]}
          type="text"
          {...commonProps}
        />
        <FormDropdown
          name="originCountry"
          label={inputFieldLabels["originCountry"]}
          options={allCountries.map((country) => ({
            label: country,
            value: country,
          }))}
          {...commonProps}
        />
        <FormDropdown
          name="currency"
          label={inputFieldLabels["currency"]}
          options={currencies.map((currency) => ({
            label: `${currency.currencyCode} (${currency.currencyName})`,
            value: currency.currencyCode,
          }))}
          {...commonProps}
        />
        <FormInput
          name="validityStartDate"
          label={inputFieldLabels["validityStartDate"]}
          type="date"
          {...commonProps}
        />
        <FormInput
          name="validityEndDate"
          label={inputFieldLabels["validityEndDate"]}
          type="date"
          {...commonProps}
        />
        <Button htmlType="submit" className="button" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </div>
  );
};

export default FinancingRequestForm;
