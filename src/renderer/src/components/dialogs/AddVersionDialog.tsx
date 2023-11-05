import React from 'react';
import { Button, ButtonGroup, Content, Dialog, Divider, Form, Heading, TextField } from '@adobe/react-spectrum';
import { FormikProps } from 'formik';
import { NewVersionForm } from '../../modules/versions';

type Props = {
  formik: FormikProps<NewVersionForm>;
  onCancel: () => void;
  onDismiss: () => void;
};

const makeValidationState: <T>(formik: FormikProps<T>, key: string) => 'valid' | 'invalid' | undefined = (
  formik,
  key,
) => {
  if (!formik.touched[key]) {
    return undefined;
  }
  return formik.errors[key] ? 'invalid' : 'valid';
};

// TODO: Translation
const AddVersionDialog: React.FC<Props> = ({ formik, onCancel, onDismiss }) => (
  <Dialog onDismiss={onDismiss}>
    <Heading>Add Version</Heading>
    <Divider />
    <Content>
      <Form onSubmit={formik.submitForm}>
        <TextField
          isRequired
          autoFocus
          name="name"
          label="New Version Name"
          validationState={makeValidationState(formik, 'name')}
          value={formik.values.name}
          onChange={(val): void => {
            formik.setFieldValue('name', val, true);
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

export default AddVersionDialog;
