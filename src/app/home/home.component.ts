import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;
  activeTab: string = "login";
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["admin@admin.com"],
      password: ["admin3.14"]
    });
  }

  ngOnInit() {}
  submit() {
    const user = {
      email: "admin@admin.com",
      password: "admin3.14"
    };
    this.loginForm.valid
      ? this.router.navigateByUrl("dashboard")
      : this.snackBar.open("Unable to login. Try Again", "", {
          duration: 3000
        });
  }
}
