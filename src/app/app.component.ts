import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatSelectionListChange} from "@angular/material/list";
import {Observable, of} from "rxjs";
import {Bookmark} from "./interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public groups: string[] = ['Work', 'Personal', 'Leisure'];
  public bookmarks$: Observable<Bookmark[]> = of([]);

  onGroupSelect({option}: MatSelectionListChange) {
    console.log(option.value);
  }
}
