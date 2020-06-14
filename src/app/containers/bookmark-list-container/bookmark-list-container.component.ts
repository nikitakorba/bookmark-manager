import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from "rxjs";
import { Bookmark, BookmarkDialogData } from "../../interfaces";
import { MatSelectionListChange } from "@angular/material/list";
import { BookmarkEditorDialogComponent } from "../../bookmark-editor-dialog/bookmark-editor-dialog.component";
import { take, takeUntil } from "rxjs/operators";
import { ConfirmationDialogComponent } from "../../confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-bookmark-list-container',
  templateUrl: 'bookmark-list-container.component.html',
  styleUrls: ['bookmark-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BookmarkListContainerComponent implements OnInit, OnDestroy {
  public groups: string[] = ['Work', 'Personal', 'Leisure'];
  public bookmarks$: Observable<Bookmark[]> = of([
    {
      name: 'Youtube',
      URL: 'www.youtube.com',
      group: 'Work',
    },
    {
      name: 'Google',
      URL: 'www.google.com',
      group: 'Work',
    }
  ]);
  public selectedGroup: string = 'All';
  private onDestroySubject: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  onGroupSelect({option}: MatSelectionListChange) {
    this.selectedGroup = option.value;
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
        console.log(editedBookmark);
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
        console.log(confirmed);
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
        console.log(bookmark);
      }
    });
  }

  ngOnDestroy() {
    this.onDestroySubject.next();
    this.onDestroySubject.complete();
  }
}
