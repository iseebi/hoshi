import React from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
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

const AddVersionDialogContainer: React.FC<Props> = ({ close }) => {
  const initialValues: NewVersionForm = { name: '' };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      close();
    },
  });
  const resetState = (): void => {
    formik.resetForm();
  };
  const handleDismiss = (): void => {
    console.log('dismiss');
    resetState();
  };
  const handleClose = (): void => {
    console.log('close');
    close();
    resetState();
  };
  return <AddVersionDialog formik={formik} onDismiss={(): void => handleDismiss()} onCancel={handleClose} />;
};

const mapStateToProps = (/* state: RootState */): StateProps => ({});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(AddVersionDialogContainer);

export default Connected;
