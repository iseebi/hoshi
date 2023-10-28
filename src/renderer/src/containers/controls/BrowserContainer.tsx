import React from 'react';
import { connect } from 'react-redux';
import Browser from '../../components/controls/Browser';

type ExportProps = {
  /* N/A */
};

type StateProps = {
  /* N/A */
};

type DispatchProps = {
  /* N/A */
};

type Props = ExportProps & StateProps & DispatchProps;

const BrowserContainer: React.FC<Props> = () => <Browser />;

const mapStateToProps = (/* state: ToolbarState */): StateProps => ({});

const mapDispatchToProps = (/* dispatch: Dispatch */): DispatchProps => ({});

const Connected = connect(mapStateToProps, mapDispatchToProps)(BrowserContainer);

export default Connected;
