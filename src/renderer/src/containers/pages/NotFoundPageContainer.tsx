import React from 'react';
import { connect } from 'react-redux';
import NotFoundPage from '../../components/pages/NotFoundPage';

type ExportProps = {
  children?: React.ReactNode;
};

type StateProps = {
  /* N/A */
};

type DispatchProps = {
  /* N/A */
};

type Props = ExportProps & StateProps & DispatchProps;

const NotFoundPageContainer: React.FC<Props> = () => <NotFoundPage />;

const mapStateToProps = (/* state: RootState */): StateProps => ({});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundPageContainer);
