import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BookmarkDialogData } from "../../types";

@Component({
  selector: 'app-confirmation-dialog-component',
  templateUrl: 'confirmation-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BookmarkDialogData,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
  }

  onDeleteConfirm() {
    this.dialogRef.close(true);
  }
}
