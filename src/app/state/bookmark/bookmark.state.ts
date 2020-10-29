import { Bookmark } from '../../types'

export type State = {
  bookmarks?: Bookmark[];
}

export const INITIAL_BOOKMARKS_STATE: State = {
  bookmarks: [
    {id: '1', name: 'Google', URL: 'www.google.com', group: 'Work'},
    {id: '2', name: 'Youtube', URL: 'www.youtube.com', group: 'Leisure'},
    {id: '3', name: 'Telegram', URL: 'web.telegram.org', group: 'Social'},
  ]
}
