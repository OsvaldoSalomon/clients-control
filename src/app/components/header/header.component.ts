import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {auth} from "firebase";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  name: string;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }


  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if (auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }
      else {
        this.isLoggedIn = false;
      }
    });
  }

}
