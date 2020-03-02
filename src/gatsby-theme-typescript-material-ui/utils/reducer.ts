import { AppState } from './AppState';

export type Action = 
  { type: 'INCREMENT' } | 
  { type: 'DECREMENT' } | 
  { type: 'RESET_COUNT' } | 
  { type: 'SET_TAB'; index: AppState['tab']; };

export default function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: Math.max(state.count - 1, 0),
      };
    case 'RESET_COUNT':
      return {
        ...state,
        count: 0,
      };
    case 'SET_TAB':
      return {
        ...state,
        tab: action.index,
      };
    default:
      throw new Error();
  }
}
