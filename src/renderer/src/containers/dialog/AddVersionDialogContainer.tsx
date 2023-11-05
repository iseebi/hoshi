import React from 'react';
import { connect } from 'react-redux';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import AddVersionDialog from '../../components/dialogs/AddVersionDialog';
import { NewVersionForm } from '../../modules/versions';

type ExportProps = {
  close: () => void;
};

type StateProps = {
  /* N/A */
};

type DispatchProps = {
  /* N/A */
};

type Props = ExportProps & StateProps & DispatchProps;

const validationSchema = Yup.object({
  name: Yup.string()
    .required('validation_required')
    .matches(/^[a-z0-9-_]*$/i, { message: 'validation_invalid_format' }),
});

const resetForm = (f: FormikHelpers<NewVersionForm>): void => {
  new Promise((resolve) => {
    setTimeout(resolve, 300);
  }).then(() => {
    console.log('resetForm');
    f.resetForm();
  });
};

const AddVersionDialogContainer: React.FC<Props> = ({ close }) => {
  const initialValues: NewVersionForm = { name: '' };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      console.log(values);
      resetForm(formikHelpers);
      close();
    },
  });
  const handleClose = (): void => {
    resetForm(formik);
    close();
  };
  return <AddVersionDialog formik={formik} onCancel={handleClose} />;
};

const mapStateToProps = (/* state: RootState */): StateProps => ({});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(AddVersionDialogContainer);

export default Connected;
