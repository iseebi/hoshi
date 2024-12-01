import { Button, ButtonGroup, Content, Dialog, Divider, Form, Heading, TextField } from "@adobe/react-spectrum";
import type { FormikProps } from "formik";
import type React from "react";
import type { NewPackageForm } from "../../modules/packages";
import { makeValidationState } from "../formHelpers";

type Props = {
  formik: FormikProps<NewPackageForm>;
  onCancel: () => void;
};

// TODO: Translation
const AddPackageDialog: React.FC<Props> = ({ formik, onCancel }) => (
  <Dialog>
    <Heading>Add Package</Heading>
    <Divider />
    <Content>
      <Form
        onSubmit={(ev): void => {
          ev.preventDefault();
          formik.submitForm();
        }}
      >
        <TextField
          isRequired
          autoFocus
          name="name"
          label="New Package Name"
          validationState={makeValidationState(formik, "name")}
          value={formik.values.name}
          onChange={(val): void => {
            formik.setFieldValue("name", val, true);
          }}
          onBlur={formik.handleBlur}
          errorMessage={formik.errors.name && formik.touched.name ? formik.errors.name : undefined}
        />
      </Form>
    </Content>
    <ButtonGroup>
      <Button variant="secondary" onPress={onCancel}>
        Cancel
      </Button>
      <Button variant="accent" onPress={formik.submitForm}>
        Add
      </Button>
    </ButtonGroup>
  </Dialog>
);

export default AddPackageDialog;
