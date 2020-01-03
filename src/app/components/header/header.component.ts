import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  allowRegistration: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private settingsService: SettingsService
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
    this.settingsService.getSettings().subscribe(settings => {
      this.allowRegistration = settings.allowRegistration;
    })
  }

  logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
