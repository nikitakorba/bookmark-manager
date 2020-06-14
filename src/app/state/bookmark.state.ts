import { BookmarkState } from "../interfaces";

export const INITIAL_BOOKMARKS_STATE: BookmarkState = {
  bookmarks: [
    {name: 'Google', URL: 'www.google.com', group: 'Work'},
    {name: 'Youtube', URL: 'www.youtube.com', group: 'Leisure'},
    {name: 'Telegram', URL: 'web.telegram.org', group: 'Social'},
  ]
}
