import { Action, ActionReducer } from '@ngrx/store';

const localStorageKey: string = 'gl_bookmarks_state';

function setSavedState(state: any) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}

function getSavedState(): any {
  return JSON.parse(localStorage.getItem(localStorageKey));
}


export function storageMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
  let appInit = true;
  return function (state: S, action: A): S {
    const nextState = reducer(state, action);
    if (appInit) {
      appInit = false;
      return {...nextState, ...getSavedState()};
    }
    setSavedState(nextState);
    return nextState;
  };
}
