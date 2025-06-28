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
  API_ENDPOINT,
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
      projectCode: undefined,
      description: undefined,
      amount: undefined,
      currency: undefined,
      validityStartDate: undefined,
      validityEndDate: undefined,
    },
  });

  const onSubmit = useCallback(
    async (data: FinancingRequestFormData) => {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.status === 200 || response.status === 201) {
        reset();
      }
    },
    [reset]
  );

  const originCountry = watch("originCountry");

  const isoriginCountryOpec = useMemo(() => {
    return opecCountries.includes(originCountry);
  }, [originCountry]);

  useEffect(() => {
    if (isoriginCountryOpec) {
      setValue("currency", "USD");
    }
  }, [isoriginCountryOpec, setValue]);

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
        <FormInput
          name="projectCode"
          label={inputFieldLabels["projectCode"]}
          type="text"
          placeholder="e.g., ABCD-1234"
          {...commonProps}
        />
        <FormInput
          name="description"
          label={inputFieldLabels["description"]}
          type="textarea"
          {...commonProps}
        />
        <FormInput
          name="amount"
          label={inputFieldLabels["amount"]}
          type="number"
          {...commonProps}
        />
        <FormDropdown
          name="currency"
          label={inputFieldLabels["currency"]}
          options={currencies.map((currency) => ({
            label: `${currency.currencyCode} (${currency.currencyName})`,
            value: currency.currencyCode,
          }))}
          disabled={isoriginCountryOpec}
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
