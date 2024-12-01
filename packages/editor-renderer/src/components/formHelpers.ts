import { FormikHelpers, FormikProps } from 'formik';

export const makeValidationState: <T>(formik: FormikProps<T>, key: string) => 'valid' | 'invalid' | undefined = (
  formik,
  key,
) => {
  if (!formik.touched[key]) {
    return undefined;
  }
  return formik.errors[key] ? 'invalid' : 'valid';
};

export const resetFormWithDelay: <T>(formik: FormikHelpers<T>) => void = (formik) => {
  new Promise((resolve) => {
    setTimeout(resolve, 300);
  }).then(() => {
    formik.resetForm();
  });
};
