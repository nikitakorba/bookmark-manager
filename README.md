# GL Bookmark Manager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8.

## How to start the app
- Clone this repository.
- Navigate to cloned repository folder.
- Run `npm install` to install the dependencies.
- Run `ng serve` for a dev server.
- Navigate to `http://localhost:4200/`.
- The app will automatically reload if you change any of the source files.

## Screenshots
#### Bookmark listing and filtering
![Alt text](./src/assets/Main1.png 'Main screen')
![Alt text](./src/assets/Main2.png 'Click on the bookmark')
![Alt text](./src/assets/Group.png 'Filtered by group')
#### Bookmark actions
![Alt text](./src/assets/actions.png 'Dropdown with actions')
![Alt text](./src/assets/Delete.png 'Delete confirmations')
#### Bookmark creating and editing
![Alt text](./src/assets/Add%20tooltip.png 'Add button')
![Alt text](./src/assets/Create_dialog.png 'Create dialog')
![Alt text](./src/assets/Edit_dialog.png 'Edit dialog')

## Bookmark application functionality
- Ability to create, edit and delete bookmarks
- Ability to view bookmarks by group
- Open bookmarks in new tab (double click the bookmark or choose this option in the menu)
- Open bookmarks in current tab
- When created or edited bookmark group can be changed by choosing the existing
group in dropdown or by specifying new group name in the input.
- Left sidebar shows the groups of the bookmarks by getting 
all unique values of bookmark `group` property. So if your group has only one bookmark,
and it's group has been changed, then the group will disappear.

## Implementation details
An application has been built using Angular Material and NgRx.
For NgRx part four actions has been created:
```js
  CREATE_BOOKMARK = '[Bookmark] Create a Bookmark';
  GET_BOOKMARKS = '[Bookmark] Get Bookmarks';
  EDIT_BOOKMARK = '[Bookmark] Edit a Bookmark';
  DELETE_BOOKMARK = '[Bookmark] Delete a Bookmark';
```

One reducer has been created to listen to those actions - `bookmarkReducer`.
Reducer handles these actions in such way:

- `CREATE_BOOKMARK` - append bookmark to the end of bookmarks array in state and return the state.
- `GET_BOOKMARKS` - return all bookmarks from state.
- `EDIT_BOOKMARK` - find the bookmark in state, remove it and replace it by edited one (bookmark can't be directly edited because of immutability principle).
- `DELETE_BOOKMARK` - find the bookmark and remove it from state.

Also there is one metareducer here:`src/app/state/storage-meta-reducer.ts`. It was created to save state in local storage so that application will persist its state
when you reload the page. 

Two selectors have been created:
- `selectBookmarksGroups` - gets all groups from existing bookmarks
- `selectBookmarks` - selector with optional group parameter that allows to get the bookmarks by group and if the parameter is not provided to get all the bookmarks.

Initial state is stored in `src/app/state/bookmark/bookmark.state.ts`.
