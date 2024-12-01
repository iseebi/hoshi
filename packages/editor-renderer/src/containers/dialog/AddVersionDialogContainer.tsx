import { useFormik } from "formik";
import type React from "react";
import { useMemo } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import AddVersionDialog from "../../components/dialogs/AddVersionDialog";
import { resetFormWithDelay } from "../../components/formHelpers";
import type { RootState } from "../../modules";
import { selectActivePackageName, selectNextVersionPrefix } from "../../modules/packages";
import { type NewVersionForm, addVersionAction } from "../../modules/versions";
import type { Dispatch } from "../helpers";

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
    .required("validation_required")
    .matches(/^[a-z0-9-_]*$/i, { message: "validation_invalid_format" }),
});

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
      resetFormWithDelay(formikHelpers);
      close();
    },
  });
  const handleCancel = (): void => {
    resetFormWithDelay(formik);
    close();
  };
  return <AddVersionDialog formik={formik} onCancel={handleCancel} />;
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
