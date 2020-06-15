import { Bookmark } from "../../interfaces";
import { Action } from "@ngrx/store";

export enum BookmarkActionsTypes {
  CREATE_BOOKMARK = '[Bookmark] Create a Bookmark',
  GET_BOOKMARKS = '[Bookmark] Get Bookmarks',
  EDIT_BOOKMARK = '[Bookmark] Edit a Bookmark',
  DELETE_BOOKMARK = '[Bookmark] Delete a Bookmark',
}

export class CreateBookmark implements Action {
  readonly type = BookmarkActionsTypes.CREATE_BOOKMARK;

  constructor(public payload: Bookmark) {
  }
}

export class GetBookmarks implements Action {
  readonly type = BookmarkActionsTypes.GET_BOOKMARKS;
}


export class EditBookmark implements Action {
  readonly type = BookmarkActionsTypes.EDIT_BOOKMARK;

  constructor(public payload: Bookmark) {
  }
}

export class DeleteBookmark implements Action {
  readonly type = BookmarkActionsTypes.DELETE_BOOKMARK;

  constructor(public payload: Bookmark) {
  }
}

export type BookmarkActions = GetBookmarks | CreateBookmark | DeleteBookmark | EditBookmark;
