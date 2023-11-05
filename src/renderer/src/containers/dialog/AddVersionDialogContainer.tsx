import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { Dispatch } from '@reduxjs/toolkit';
import AddVersionDialog from '../../components/dialogs/AddVersionDialog';
import { addVersionAction, NewVersionForm } from '../../modules/versions';
import { RootState } from '../../modules';
import { selectActivePackageName, selectNextVersionPrefix } from '../../modules/packages';

type ExportProps = {
  close: () => void;
};

type StateProps = {
  activePackageName: string | null;
  nextVersionPrefix: string;
};

type DispatchProps = {
  dispatch: {
    addVersion: (packageId: string, versionId: string) => void;
  };
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
    f.resetForm();
  });
};

const AddVersionDialogContainer: React.FC<Props> = ({ activePackageName, nextVersionPrefix, close, dispatch }) => {
  const initialValues: NewVersionForm = useMemo(() => ({ name: nextVersionPrefix }), [nextVersionPrefix]);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      if (!activePackageName) {
        return;
      }
      dispatch.addVersion(activePackageName, values.name);
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

const mapStateToProps = (state: RootState): StateProps => ({
  activePackageName: selectActivePackageName(state),
  nextVersionPrefix: selectNextVersionPrefix(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatch: {
    addVersion: (packageId, versionId) => dispatch(addVersionAction({ packageId, versionId })),
  },
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(AddVersionDialogContainer);

export default Connected;
