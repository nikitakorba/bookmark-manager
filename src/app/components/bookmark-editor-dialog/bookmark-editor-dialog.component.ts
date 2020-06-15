import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApplicationState, BookmarkDialogData } from "../../interfaces";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { selectBookmarksGroups } from "../../app.state";
import { getUniqueID } from "../../helpers/unique-id-generator";


@Component({
  selector: 'app-bookmark-editor-dialog',
  templateUrl: 'bookmark-editor-dialog.component.html',
  styleUrls: ['bookmark-editor-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BookmarkEditorDialogComponent implements OnInit {
  public bookmarkForm: FormGroup;
  public groups$: Observable<string[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BookmarkDialogData,
    private dialogRef: MatDialogRef<BookmarkEditorDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store<ApplicationState>,
  ) {
  }

  ngOnInit() {
    this.groups$ = this.store.select(selectBookmarksGroups);
    this.bookmarkForm = this.formBuilder.group({
      id: [this.data?.bookmark?.id || getUniqueID()],
      name: [this.data?.bookmark?.name, Validators.required],
      URL: [this.data?.bookmark?.URL, Validators.required],
      group: [this.data?.bookmark?.group, Validators.required]
    });
  }

  onSave() {
    this.dialogRef.close(this.bookmarkForm.value);
  }
}
