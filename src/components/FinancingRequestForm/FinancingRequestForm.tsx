import "./FinancingRequestForm.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import Success from "../Success/Success";

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
      paymentAmount: undefined,
      paymentCurrency: undefined,
      validityStartDate: undefined,
      validityEndDate: undefined,
    },
  });

  const [success, setSuccess] = useState(false);

  const onSubmit = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
    setSuccess(true);
  }, [reset]);

  const originCountry = watch("originCountry");

  const isoriginCountryOpec = useMemo(() => {
    return opecCountries.includes(originCountry);
  }, [originCountry]);

  useEffect(() => {
    if (isoriginCountryOpec) {
      setValue("paymentCurrency", "USD");
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
      {success ? (
        <Success onGoBack={() => setSuccess(false)} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Financing Request Form</h2>
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
              label: `${country}${
                opecCountries.includes(country) ? " (OPEC Member Country)" : ""
              }`,
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
            name="paymentAmount"
            label={inputFieldLabels["paymentAmount"]}
            type="number"
            {...commonProps}
          />
          <FormDropdown
            name="paymentCurrency"
            label={inputFieldLabels["paymentCurrency"]}
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
          <Button
            htmlType="submit"
            className="button"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default FinancingRequestForm;
