import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Bookmark, BookmarkDialogData} from "../interfaces";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {take, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {BookmarkEditorDialogComponent} from "../bookmark-editor-dialog/bookmark-editor-dialog.component";

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkListComponent implements OnInit, OnDestroy {
  @Input() selectedGroup: string = 'All';
  @Input() bookmarks: Bookmark[] = [
    {
      name: 'Youtube',
      URL: 'www.youtube.com',
      group: 'Work',
    }
  ];
  private onDestroySubject: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  navigateToURL(newTab: boolean, {URL}: Bookmark) {
    const urlToNavigate: string = `//${URL}`;
    newTab ? window.open(urlToNavigate, '_blank') : window.location.href = urlToNavigate;
  }

  editBookmark(bookmark: Bookmark) {
    const data: BookmarkDialogData = {
      bookmark,
    }
    this.dialog.open(BookmarkEditorDialogComponent, {
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

  deleteBookmark(bookmark: Bookmark) {
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

  ngOnDestroy() {
    this.onDestroySubject.next();
    this.onDestroySubject.complete();
  }

}
