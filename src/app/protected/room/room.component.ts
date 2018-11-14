import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.scss"]
})
export class RoomComponent implements OnInit {
  constructor(private ar: ActivatedRoute) {}

  ngOnInit() {
    this.ar.data.subscribe(res => {
      console.log(res);
    });
  }
}
