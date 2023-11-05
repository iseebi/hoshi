import React from 'react';
import { Button, ButtonGroup, Content, Dialog, Divider, Heading } from '@adobe/react-spectrum';

type Props = {
  onCloseRequest: () => void;
};

// TODO: Translation
const AddVersionDialog: React.FC<Props> = ({ onCloseRequest }) => (
  <Dialog>
    <Heading>Add Version</Heading>
    <Divider />
    <Content>Content</Content>
    <ButtonGroup>
      <Button variant="secondary" onPress={onCloseRequest}>
        Cancel
      </Button>
      <Button variant="accent">Add</Button>
    </ButtonGroup>
  </Dialog>
);

export default AddVersionDialog;
