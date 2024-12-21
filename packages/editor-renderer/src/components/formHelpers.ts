import type { FormikHelpers, FormikProps } from "formik";

export const makeValidationState: <T>(formik: FormikProps<T>, key: string) => "valid" | "invalid" | undefined = (
  formik,
  key,
) => {
  const touched = formik.touched as Record<string, boolean>;
  const errors = formik.errors as Record<string, string>;
  if (!touched[key]) {
    return undefined;
  }
  return errors[key] ? "invalid" : "valid";
};

export const resetFormWithDelay: <T>(formik: FormikHelpers<T>) => void = (formik) => {
  new Promise((resolve) => {
    setTimeout(resolve, 300);
  }).then(() => {
    formik.resetForm();
  });
};
