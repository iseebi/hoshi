import React, { useState } from 'react';
import { connect } from 'react-redux';
import AddVersionDialog from '../../components/dialogs/AddVersionDialog';

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

const AddVersionDialogContainer: React.FC<Props> = ({ close }) => {
  const [name, setName] = useState<string>('');

  const resetState = (): void => {
    setName('');
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
  const handleSubmit = (): void => {
    console.log('submit');
    close();
    resetState();
  };
  return (
    <AddVersionDialog
      name={name}
      onChangeName={setName}
      onDismiss={handleDismiss}
      onCancel={handleClose}
      onSubmit={handleSubmit}
    />
  );
};

const mapStateToProps = (/* state: RootState */): StateProps => ({});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(AddVersionDialogContainer);

export default Connected;
