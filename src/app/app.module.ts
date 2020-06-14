import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";
import { BookmarkEditorDialogComponent } from "./components/bookmark-editor-dialog/bookmark-editor-dialog.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { BookmarkListContainerComponent } from "./containers/bookmark-list-container/bookmark-list-container.component";
import { StoreModule } from '@ngrx/store';
import { INITIAL_APPLICATION_STATE, REDUCERS } from "./app.state";
import { storageMetaReducer } from "./state/storage-meta-reducer";

@NgModule({
  declarations: [
    AppComponent,
    BookmarkListComponent,
    ConfirmationDialogComponent,
    BookmarkEditorDialogComponent,
    BookmarkListContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    StoreModule.forRoot(REDUCERS, {initialState: INITIAL_APPLICATION_STATE, metaReducers: [storageMetaReducer]}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
