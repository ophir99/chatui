import { NgModule } from "@angular/core";
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatToolbarModule
} from "@angular/material";
@NgModule({
  imports: [
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  exports: [
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule
  ]
})
export class MatWidgetsModule {}
