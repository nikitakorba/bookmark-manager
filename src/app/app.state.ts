import { ActionReducerMap } from '@ngrx/store';
import { BookmarkState } from "./state/bookmark";
import { reducer as bookmarkReducer } from "./state/bookmark/bookmark.reducers";

export interface ApplicationState {
  bookmarks: BookmarkState.State;
}

export const ALL_GROUP_NAME = 'All';

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  bookmarks: BookmarkState.INITIAL_BOOKMARKS_STATE
}

export const REDUCERS: ActionReducerMap<ApplicationState> = {
  bookmarks: bookmarkReducer
}



