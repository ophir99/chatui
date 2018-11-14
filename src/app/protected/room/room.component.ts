import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TextService } from "src/app/services/text.service";
import { FormBuilder } from "@angular/forms";
import socket from "socket.io-client";
@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.scss"]
})
export class RoomComponent implements OnInit {
  room;
  messages = [];
  postForm;
  constructor(
    private fb: FormBuilder,
    private ar: ActivatedRoute,
    private textService: TextService
  ) {}

  ngOnInit() {
    this.createForm();
    this.ar.data.subscribe((res: any) => {
      console.log(res);
      if (res.room.response.length === 1) {
        this.room = res.room.response[0]._id;
        this.getAllMessages();
      }
    });
    const io = socket("http://localhost:4500");
    io.on("connect", () => {
      io.emit("createRoom", this.room);
    });
    io.on("newMsg", data => {
      console.log(data);
    });
  }
  createForm() {
    this.postForm = this.fb.group({
      post: []
    });
  }
  post() {
    const data = {
      ...this.postForm.value,
      room: this.room,
      by: sessionStorage.getItem("user")
    };
    this.textService.send(data).subscribe(res => {
      console.log(res);
    });
  }

  getAllMessages() {
    this.textService.getConvo(this.room).subscribe(res => {
      console.log(res);
    });
  }
}
