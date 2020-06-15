import { BookmarkActions, BookmarkActionsTypes } from './bookmark.actions'
import { Bookmark, BookmarkState } from "../../interfaces";
import { INITIAL_BOOKMARKS_STATE } from "./bookmark.state";


export function bookmarkReducer(state: BookmarkState = INITIAL_BOOKMARKS_STATE, action: BookmarkActions): BookmarkState {
  switch (action.type) {
    case BookmarkActionsTypes.CREATE_BOOKMARK: {
      return {bookmarks: [...state.bookmarks, action.payload]};
    }
    case BookmarkActionsTypes.EDIT_BOOKMARK: {
      const foundIndex = state.bookmarks.findIndex(({id}: Bookmark) => id === action.payload.id);
      const bookmarks: Bookmark[] = [...state.bookmarks];
      if (foundIndex >= 0) {
        bookmarks.splice(foundIndex, 1, action.payload)
      }
      return {
        bookmarks,
      };
    }
    case BookmarkActionsTypes.DELETE_BOOKMARK: {
      return {bookmarks: state.bookmarks.filter(({id}: Bookmark) => id !== action.payload.id)};
    }
    case BookmarkActionsTypes.GET_BOOKMARKS:
    default: {
      return {
        ...state
      };
    }
  }
}
