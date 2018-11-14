import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-userslist",
  templateUrl: "./userslist.component.html",
  styleUrls: ["./userslist.component.scss"]
})
export class UserslistComponent implements OnInit {
  usersList;
  constructor(private ar: ActivatedRoute, private userService: UserService) {
    this.ar.data.subscribe((data: any) => {
      this.usersList = data.usersList.response;
    });
  }

  ngOnInit() {}

  inviteToChat(id, email) {
    console.log(id);
    this.userService.inviteToChat(id, email).subscribe(res => {
      console.log(res);
    });
  }
}
