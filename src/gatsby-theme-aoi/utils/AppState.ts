
export type Sort = 'older' | 'newer';

export interface AppState {
  sort: Sort;
}
export const initialAppState: AppState = {
  sort: 'older',
};