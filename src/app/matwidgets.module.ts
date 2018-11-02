import { NgModule } from "@angular/core";
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
} from "@angular/material";
@NgModule({
  imports: [
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  exports: [
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class MatWidgetsModule {}
