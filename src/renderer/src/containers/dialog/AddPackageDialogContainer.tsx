import React from 'react';
import { connect } from 'react-redux';
import AddPackageDialog from '../../components/dialogs/AddPackageDialog';

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

const AddPackageDialogContainer: React.FC<Props> = ({ close }) => <AddPackageDialog onCloseRequest={close} />;

const mapStateToProps = (/* state: RootState */): StateProps => ({});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(AddPackageDialogContainer);

export default Connected;
