import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Bookmark } from "../../interfaces";
import { MatSelectionListChange } from "@angular/material/list";

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkListComponent {
  @Input() selectedGroup: string;
  @Input() bookmarks: Bookmark[];

  @Output() bookmarkEditEvent: EventEmitter<Bookmark> = new EventEmitter<Bookmark>();
  @Output() bookmarkDeleteEvent: EventEmitter<Bookmark> = new EventEmitter<Bookmark>();
  @Output() bookmarkCreateEvent: EventEmitter<void> = new EventEmitter<void>();

  public selectedBookmarkName: string;

  public navigateToURL(newTab: boolean, {URL}: Bookmark) {
    const urlToNavigate: string = `//${URL}`;
    newTab ? window.open(urlToNavigate, '_blank') : window.location.href = urlToNavigate;
  }

  public editBookmark(bookmark: Bookmark) {
    this.bookmarkEditEvent.emit(bookmark);
  }

  public deleteBookmark(bookmark: Bookmark) {
    this.bookmarkDeleteEvent.emit(bookmark);
  }

  public createBookmark() {
    this.bookmarkCreateEvent.emit();
  }

  public onBookmarkSelect({option}: MatSelectionListChange) {
    this.selectedBookmarkName = option.value;
  }
}
