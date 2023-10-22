import React from 'react';
import { connect } from 'react-redux';
import TopPage from '../../components/pages/TopPage';

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

const TopPageContainer: React.FC<Props> = () => <TopPage />;

const mapStateToProps = (/* state: RootState */): StateProps => ({});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TopPageContainer);
