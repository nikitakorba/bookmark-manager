import * as BookmarkActions from './bookmark.actions'
import { Bookmark } from "../../types";
import * as BookmarkState from './bookmark.state'
import { INITIAL_BOOKMARKS_STATE } from "./bookmark.state";
import { Action, createReducer, on } from '@ngrx/store';

const bookmarkReducer = createReducer(
  INITIAL_BOOKMARKS_STATE,
  on(BookmarkActions.createBookmark, (state, bookmark) => {
    return { bookmarks: [...state.bookmarks, bookmark] };

  }),
  on(BookmarkActions.editBookmark, (state, bookmark) => {

    const foundIndex = state.bookmarks.findIndex(({ id }: Bookmark) => id === bookmark.id);
    const bookmarks: Bookmark[] = [...state.bookmarks];
    if (foundIndex >= 0) {
      bookmarks.splice(foundIndex, 1, bookmark)
    }
    return {
      bookmarks,
    };

  }),
  on(BookmarkActions.deleteBookmark, (state, bookmark) => {
    return { bookmarks: state.bookmarks.filter(({ id }: Bookmark) => id !== bookmark.id) };
  }),
);

export function reducer(state: BookmarkState.State, action: Action) {
  return bookmarkReducer(state, action);
}
