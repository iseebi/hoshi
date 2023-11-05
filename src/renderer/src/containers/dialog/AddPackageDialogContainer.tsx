import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Dispatch } from '@reduxjs/toolkit';
import AddPackageDialog from '../../components/dialogs/AddPackageDialog';
import { addPackageAction, NewPackageForm } from '../../modules/packages';
import { resetFormWithDelay } from '../../components/formHelpers';

type ExportProps = {
  close: () => void;
};

type StateProps = {
  /* N/A */
};

type DispatchProps = {
  dispatch: {
    addPackage: (packageId: string) => void;
  };
};

type Props = ExportProps & StateProps & DispatchProps;

const validationSchema = Yup.object({
  name: Yup.string()
    .required('validation_required')
    .matches(/^[a-z0-9-_]*$/i, { message: 'validation_invalid_format' }),
});

const AddPackageDialogContainer: React.FC<Props> = ({ close, dispatch }) => {
  const initialValues: NewPackageForm = { name: '' };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      dispatch.addPackage(values.name);
      resetFormWithDelay(formikHelpers);
      close();
    },
  });
  const handleCancel = (): void => {
    resetFormWithDelay(formik);
    close();
  };
  return <AddPackageDialog formik={formik} onCancel={handleCancel} />;
};

const mapStateToProps = (/* state: RootState */): StateProps => ({});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatch: {
    addPackage: (packageId) => dispatch(addPackageAction({ packageId })),
  },
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(AddPackageDialogContainer);

export default Connected;
