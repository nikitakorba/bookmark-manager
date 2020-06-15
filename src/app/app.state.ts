import { ActionReducerMap } from '@ngrx/store';
import { createSelector } from '@ngrx/store';
import { ApplicationState, Bookmark } from "./interfaces";
import { bookmarkReducer, INITIAL_BOOKMARKS_STATE } from "./state/bookmark";

const getBookmarks = ({bookmarks}: ApplicationState) => bookmarks.bookmarks;

export const ALL_GROUP_NAME = 'All';

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  bookmarks: INITIAL_BOOKMARKS_STATE
}

export const REDUCERS: ActionReducerMap<ApplicationState> = {
  bookmarks: bookmarkReducer
}


export const selectBookmarksGroups = createSelector(
  getBookmarks, (bookmarks: Bookmark[]) => {
    return [...new Set(bookmarks.map(bookmark => bookmark.group))];
  }
);

export const selectBookmarks = (group: string = ALL_GROUP_NAME) => createSelector(
  getBookmarks, (bookmarks: Bookmark[]) => {
    return group === ALL_GROUP_NAME ? bookmarks : bookmarks.filter(b => b.group === group);
  }
);


