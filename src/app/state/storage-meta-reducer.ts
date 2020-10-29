import { Action, ActionReducer } from '@ngrx/store';
import { ApplicationState } from '../app.state';

const localStorageKey: string = 'bookmarks_state';

function setSavedState(state: any) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}

function getSavedState(): any {
  return JSON.parse(localStorage.getItem(localStorageKey));
}


export function storageMetaReducer<ApplicationState, A extends Action = Action>(reducer: ActionReducer<ApplicationState, A>) {
  let appInit = true;
  return function (state: ApplicationState, action: A): ApplicationState {
    const nextState: ApplicationState = reducer(state, action);
    if (appInit) {
      appInit = false;
      return {...nextState, ...getSavedState()};
    }
    setSavedState(nextState);
    return nextState;
  };
}
