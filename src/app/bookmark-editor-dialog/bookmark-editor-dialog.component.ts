import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BookmarkDialogData} from "../interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-bookmark-editor-dialog',
  templateUrl: 'bookmark-editor-dialog.component.html',
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
      name: [null, Validators.required],
      URL: [null, Validators.required],
      group: [null, Validators.required]
    });
    if (this.data.bookmark) {
      this.bookmarkForm.patchValue(this.data.bookmark);
    }
  }

  onSave() {
    this.dialogRef.close(this.bookmarkForm.value);
  }
}
