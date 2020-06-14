import { BookmarkState } from "../interfaces";

export const INITIAL_BOOKMARKS_STATE: BookmarkState = {
  bookmarks: [
    {id: '1', name: 'Google', URL: 'www.google.com', group: 'Work'},
    {id: '2', name: 'Youtube', URL: 'www.youtube.com', group: 'Leisure'},
    {id: '3', name: 'Telegram', URL: 'web.telegram.org', group: 'Social'},
  ]
}
