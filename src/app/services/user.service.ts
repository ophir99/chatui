import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class UserService {
  user: string;
  constructor(private http: HttpClient) {}

  createUser = data =>
    this.http.post(`${environment.url.dev}/user/create`, data);

  logUserIn = data => this.http.post(`${environment.url.dev}/user/login`, data);

  getAllUsers = () => this.http.get(`${environment.url.dev}/user/all`);

  updateUser(user) {
    sessionStorage.setItem("user", user);
  }
  getUser = () => sessionStorage.getItem("user");

  logUserOut =  =>
    this.http.put(`${environment.url.dev}/user/logout/${this.getUser()}`, {});
}
