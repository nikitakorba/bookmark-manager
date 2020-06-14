import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BookmarkDialogData } from "../../interfaces";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-bookmark-editor-dialog',
  templateUrl: 'bookmark-editor-dialog.component.html',
  styleUrls: ['bookmark-editor-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BookmarkEditorDialogComponent implements OnInit {
  public bookmarkForm: FormGroup;
  public groups: string[] = ['All', 'Leisure', 'Work'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BookmarkDialogData,
    private dialogRef: MatDialogRef<BookmarkEditorDialogComponent>,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.bookmarkForm = this.formBuilder.group({
      name: [this.data?.bookmark.name, Validators.required],
      URL: [this.data?.bookmark.URL, Validators.required],
      group: [this.data?.bookmark.group, Validators.required]
    });
  }

  onSave() {
    this.dialogRef.close(this.bookmarkForm.value);
  }
}
