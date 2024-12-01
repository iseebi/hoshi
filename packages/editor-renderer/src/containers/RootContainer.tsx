import type React from "react";
import { connect } from "react-redux";
import Root from "../components/Root";
import type { RootState } from "../modules";
import { fetchCurrentProjectAction, selectHasCurrentProject } from "../modules/projects";
import AppHeaderContainer from "./controls/AppHeaderContainer";
import AppToolbarContainer from "./controls/AppToolbarContainer";
import RootEditorContainer from "./editors/RootEditorContainer";
import type { Dispatch } from "./helpers";
import { useOnMount } from "./sideEffects";
import StartViewContainer from "./startView/StartViewContainer";

type ExportProps = object;

type StateProps = {
  hasCurrentProject: boolean;
};

type DispatchProps = {
  dispatch: {
    fetchCurrentProject: () => void;
  };
};

type Props = ExportProps & StateProps & DispatchProps;

const RootContainer: React.FC<Props> = ({ hasCurrentProject, dispatch }) => {
  useOnMount(() => {
    dispatch.fetchCurrentProject();
  });

  return (
    <Root header={<AppHeaderContainer />} toolbar={<AppToolbarContainer />}>
      {hasCurrentProject ? <RootEditorContainer /> : <StartViewContainer />}
    </Root>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  hasCurrentProject: selectHasCurrentProject(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatch: {
    fetchCurrentProject: () => dispatch(fetchCurrentProjectAction()),
  },
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(RootContainer);

export default Connected;
