export type Sort = "older" | "newer";

export type AppState = {
  sort: Sort;
};

export const initialAppState: AppState = {
  sort: "older",
};

export function useInitialAppState() {
  // noop
}

export type Action = { type: "TOGGLE_SORT" };

export default function reducer(state: AppState, action: Action) {
  switch (action.type) {
    case "TOGGLE_SORT":
      return {
        ...state,
        sort: state.sort === "older" ? "newer" : "older",
      };
    default:
      throw new Error();
  }
}
