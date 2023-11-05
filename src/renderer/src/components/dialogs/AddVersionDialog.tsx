import React from 'react';
import { Button, ButtonGroup, Content, Dialog, Divider, Form, Heading, TextField } from '@adobe/react-spectrum';

type Props = {
  name: string;
  onChangeName: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onDismiss: () => void;
};

// TODO: Translation
const AddVersionDialog: React.FC<Props> = ({ name, onChangeName, onCancel, onDismiss, onSubmit }) => (
  <Dialog onDismiss={onDismiss}>
    <Heading>Add Version</Heading>
    <Divider />
    <Content>
      <Form
        onSubmit={(ev): void => {
          ev.preventDefault();
          onSubmit();
        }}
      >
        <TextField isRequired autoFocus label="New Version Name" value={name} onChange={onChangeName} />
      </Form>
    </Content>
    <ButtonGroup>
      <Button variant="secondary" onPress={onCancel}>
        Cancel
      </Button>
      <Button variant="accent" onPress={onSubmit}>
        Add
      </Button>
    </ButtonGroup>
  </Dialog>
);

export default AddVersionDialog;
