import { BookmarkActions, BookmarkActionsTypes } from './bookmark.actions'
import { Bookmark, BookmarkState } from "../interfaces";
import { INITIAL_BOOKMARKS_STATE } from "./bookmark.state";


export function bookmarkReducer(state: BookmarkState = INITIAL_BOOKMARKS_STATE, action: BookmarkActions): BookmarkState {
  switch (action.type) {
    case BookmarkActionsTypes.CREATE_BOOKMARK: {
      return {bookmarks: [...state.bookmarks, action.payload]};
    }
    case BookmarkActionsTypes.EDIT_BOOKMARK: {
      const foundIndex = state.bookmarks.findIndex((value: Bookmark) => value === action.payload);
      const bookmarks: Bookmark[] = [...state.bookmarks];
      if (foundIndex >= 0) {
        bookmarks[foundIndex] = action.payload;
      }
      return {
        bookmarks,
      };
    }
    case BookmarkActionsTypes.DELETE_BOOKMARK: {
      const foundIndex = state.bookmarks.findIndex((value: Bookmark) => value === action.payload);
      return {bookmarks: state.bookmarks.filter((bookmark, i) => i !== foundIndex)};
    }
    case BookmarkActionsTypes.GET_BOOKMARKS:
    default: {
      return {
        ...state
      };
    }
  }
}
