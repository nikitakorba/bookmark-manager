import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { Bookmark, BookmarkDialogData } from "../../interfaces";
import { MatSelectionListChange } from "@angular/material/list";
import { BookmarkEditorDialogComponent } from "../../components/bookmark-editor-dialog/bookmark-editor-dialog.component";
import { take, takeUntil } from "rxjs/operators";
import { ConfirmationDialogComponent } from "../../components/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { ApplicationState } from "../../interfaces/application-state.interface";
import { ALL_GROUP_NAME, selectBookmarks, selectBookmarksGroups } from "../../app.state";
import { CreateBookmark, DeleteBookmark, EditBookmark } from "../../state";

@Component({
  selector: 'app-bookmark-list-container',
  templateUrl: 'bookmark-list-container.component.html',
  styleUrls: ['bookmark-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BookmarkListContainerComponent implements OnInit, OnDestroy {
  public groups$: Observable<string[]>;
  public bookmarks$: Observable<Bookmark[]>;
  public selectedGroup: string = ALL_GROUP_NAME;
  private onDestroySubject: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog, private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.groups$ = this.store.select(selectBookmarksGroups);
    this.bookmarks$ = this.store.select(selectBookmarks());
  }

  onGroupSelect({option}: MatSelectionListChange) {
    this.selectedGroup = option.value;
    this.bookmarks$ = this.store.select(selectBookmarks(this.selectedGroup));
  }

  onBookmarkEdit(bookmark: Bookmark) {
    const data: BookmarkDialogData = {
      bookmark,
    }
    this.dialog.open(BookmarkEditorDialogComponent, {
      data,
    }).afterClosed().pipe(
      take(1),
      takeUntil(this.onDestroySubject)
    ).subscribe((editedBookmark: Bookmark) => {
      if (editedBookmark) {
        this.store.dispatch(new EditBookmark(editedBookmark));
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
        this.store.dispatch(new DeleteBookmark(bookmark));
      }
    });
  }

  onBookmarkCreate() {
    this.dialog.open(BookmarkEditorDialogComponent)
      .afterClosed().pipe(
      take(1),
      takeUntil(this.onDestroySubject)
    ).subscribe((bookmark: Bookmark) => {
      if (bookmark) {
        this.store.dispatch(new CreateBookmark(bookmark));
      }
    });
  }

  ngOnDestroy() {
    this.onDestroySubject.next();
    this.onDestroySubject.complete();
  }
}
