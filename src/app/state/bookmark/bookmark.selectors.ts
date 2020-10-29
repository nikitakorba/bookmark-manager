import { createSelector } from '@ngrx/store';
import { Bookmark } from '../../types';

export const ALL_GROUP_NAME = 'All';

export const getBookmarks = ({ bookmarks }) => bookmarks.bookmarks;

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
