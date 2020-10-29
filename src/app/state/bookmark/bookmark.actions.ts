import { Bookmark } from "../../types";
import { Action, createAction, props } from "@ngrx/store";

export enum BookmarkActionsTypes {
  CREATE_BOOKMARK = '[Bookmark] Create a Bookmark',
  GET_BOOKMARKS = '[Bookmark] Get Bookmarks',
  EDIT_BOOKMARK = '[Bookmark] Edit a Bookmark',
  DELETE_BOOKMARK = '[Bookmark] Delete a Bookmark',
}

export const createBookmark = createAction(BookmarkActionsTypes.CREATE_BOOKMARK, props<Bookmark>());
export const getBookmarks = createAction(BookmarkActionsTypes.GET_BOOKMARKS);
export const editBookmark = createAction(BookmarkActionsTypes.EDIT_BOOKMARK, props<Bookmark>());
export const deleteBookmark = createAction(BookmarkActionsTypes.DELETE_BOOKMARK, props<Bookmark>());
