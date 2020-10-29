export interface Bookmark {
  id: string;
  name: string;
  URL: string;
  group: string;
}

export interface BookmarkDialogData {
  editMode?: boolean;
  bookmark?: Bookmark;
}
