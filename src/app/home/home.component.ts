import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  activeTab: string = "login";
  showSpinner: boolean = false;
  msg: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["admin@admin.com"],
      password: ["admin3.14"]
    });
    this.signupForm = this.formBuilder.group({
      email: [],
      password: [],
      confirmPassword: []
    });
  }

  ngOnInit() {}
  submit() {
    this.changeDom("");
    this.msg = "logging in";
    const user = {
      email: "admin@admin.com",
      password: "admin3.14"
    };
    // this.loginForm.valid
    //   ? this.router.navigateByUrl("dashboard")
    //   : this.snackBar.open("Unable to login. Try Again", "", {
    //       duration: 3000
    //     });

    setTimeout(() => {
      this.changeDom("login");
      // this.router.navigateByUrl("dashboard");
    }, 2000);
  }

  register() {
    console.log(this.signupForm.value);
    this.changeDom("");
    this.msg = "Creating your account";
    this.userService.createUser(this.signupForm.value).subscribe(
      res => {
        console.log(res);
      },
      error => {
        setTimeout(() => {
          console.log(error);
          this.changeDom("createAccount");
        }, 4000);
      }
    );
  }

  changeDom(tab: string) {
    this.showSpinner = !this.showSpinner;
    this.activeTab = tab;
  }
}
