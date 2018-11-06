import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { TextService } from "src/app/services/text.service";
import { UserService } from "src/app/services/user.service";

import * as socket from "socket.io-client";
import { Router } from "@angular/router";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  msg;
  users = [];
  to;
  user;
  thread;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private textService: TextService,
    private router: Router
  ) {
    this.msg = this.fb.group({
      text: []
    });

    console.log("**", socket);
    const io = socket("http://localhost:4500");
    io.on("newMessage", msg => {
      this.thread = [...this.thread, msg];
    });
    io.on("Change Log Status", ({ email, status }) => {
      console.log("user ", email);
      this.users.forEach(x => {
        if (x.email == email) {
          x.isLogged = status;
        }
      });
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.getAllUsers();
    }, 1000);
    this.user = this.userService.getUser();
    console.log(this.user);
    // console.log(openSocket);
    // let io = openSocket("http://localhost:4500");
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (res: { response: string[] }) => {
        console.log(res);
        this.users = res.response.filter(
          (user: any) => user.email != this.userService.getUser()
        );
      },
      err => console.log(err)
    );
  }

  getAllMessages(by, to) {
    this.textService.getAllMessages(by, to).subscribe(
      (res: any) => {
        console.log(res);
        this.thread = res.response;
      },
      err => {
        console.log(err);
      }
    );
  }

  sendText() {
    this.textService
      .send({ ...this.msg.value, to: this.to, by: this.user })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }

  selectedTo(receiver) {
    console.log("Re", receiver, "Na", this.user);
    this.to = receiver;
    this.getAllMessages(this.user, receiver);
  }
  logout() {
    this.userService.logUserOut().subscribe(
      res => {
        sessionStorage.removeItem("user");
        this.router.navigateByUrl("/");
      },
      err => {
        console.log(err);
      }
    );
  }
}
