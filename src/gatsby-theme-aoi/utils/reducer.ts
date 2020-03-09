import { AppState } from './AppState';

export type Action = { type: 'TOGGLE_SORT' };

export default function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'TOGGLE_SORT':
      return {
        ...state,
        sort: state.sort === 'older' ? 'newer' : 'older'
      };
    default:
      throw new Error();
  }
}
