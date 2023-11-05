import React from 'react';
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

const AddVersionDialogContainer: React.FC<Props> = ({ close }) => <AddVersionDialog onCloseRequest={close} />;

const mapStateToProps = (/* state: RootState */): StateProps => ({});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(AddVersionDialogContainer);

export default Connected;
