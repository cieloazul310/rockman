import * as React from "react";
import { initialAppState, type AppState, type Action } from "./AppState";

const AppStateContext = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialAppState,
  dispatch: () => {
    throw new Error();
  },
});

export default AppStateContext;

/**
 * A hook returns global `AppState`.
 * @returns {Object} AppState
 */
export function useAppState() {
  const { state } = React.useContext(AppStateContext);
  return React.useMemo(() => state, [state]);
}

/**
 * A hook returns `AppState` dispatch function.
 * @returns {function} React.Dispatch<Action>
 */
export function useDispatch() {
  const { dispatch } = React.useContext(AppStateContext);
  return React.useCallback(
    (action: Action) => {
      dispatch(action);
    },
    [dispatch],
  );
}
