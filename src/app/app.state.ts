import { ActionReducerMap } from '@ngrx/store';
import { reducer as bookmarkReducer, INITIAL_BOOKMARKS_STATE, BookmarkState } from "./state/bookmark";

export interface ApplicationState {
  bookmarks: BookmarkState.State;
}

export const ALL_GROUP_NAME = 'All';

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  bookmarks: INITIAL_BOOKMARKS_STATE
}

export const REDUCERS: ActionReducerMap<ApplicationState> = {
  bookmarks: bookmarkReducer
}



