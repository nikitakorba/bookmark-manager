import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { Bookmark, BookmarkDialogData } from "../../types";
import { MatSelectionListChange } from "@angular/material/list";
import { BookmarkEditorDialogComponent } from "../../components/bookmark-editor-dialog/bookmark-editor-dialog.component";
import { take, takeUntil } from "rxjs/operators";
import { ConfirmationDialogComponent } from "../../components/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { BookmarkActions, BookmarkSelectors } from '../../state/bookmark/index';


@Component({
  selector: 'app-bookmark-list-container',
  templateUrl: 'bookmark-list-container.component.html',
  styleUrls: ['bookmark-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BookmarkListContainerComponent implements OnInit, OnDestroy {
  public groups$: Observable<string[]>;
  public bookmarks$: Observable<Bookmark[]>;
  public selectedGroup: string = BookmarkSelectors.ALL_GROUP_NAME;
  private onDestroySubject: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog, private store: Store) {
  }

  ngOnInit() {
    this.groups$ = this.store.select(BookmarkSelectors.selectBookmarksGroups);
    this.bookmarks$ = this.store.select(BookmarkSelectors.selectBookmarks());
  }

  onGroupSelect({ option }: MatSelectionListChange) {
    this.selectedGroup = option.value;
    this.bookmarks$ = this.store.select(BookmarkSelectors.selectBookmarks(this.selectedGroup));
  }

  onBookmarkEdit(bookmark: Bookmark) {
    const data: BookmarkDialogData = {
      bookmark,
      editMode: true,
    }
    this.dialog.open(BookmarkEditorDialogComponent, {
      data,
    }).afterClosed().pipe(
      take(1),
      takeUntil(this.onDestroySubject)
    ).subscribe((editedBookmark: Bookmark) => {
      if (editedBookmark) {
        this.store.dispatch(BookmarkActions.editBookmark(editedBookmark));
      }
    });
  }

  onBookmarkDelete(bookmark: Bookmark) {
    const data: BookmarkDialogData = {
      bookmark,
    }
    this.dialog.open(ConfirmationDialogComponent, {
      data,
    }).afterClosed().pipe(
      take(1),
      takeUntil(this.onDestroySubject)
    ).subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dispatch(BookmarkActions.deleteBookmark(bookmark));
      }
    });
  }

  onBookmarkCreate() {
    const data: BookmarkDialogData = {
      editMode: false,
    }
    this.dialog.open(BookmarkEditorDialogComponent, {
      data,
    })
      .afterClosed().pipe(
        take(1),
        takeUntil(this.onDestroySubject)
      ).subscribe((bookmark: Bookmark) => {
        if (bookmark) {
          this.store.dispatch(BookmarkActions.createBookmark(bookmark));
        }
      });
  }

  ngOnDestroy() {
    this.onDestroySubject.next();
    this.onDestroySubject.complete();
  }
}
