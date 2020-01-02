import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SettingsService} from "../../services/settings.service";
import {SettingsModel} from "../../model/settings.model";

@Component({
  selector: 'app-configuration',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  allowRegistration = false;

  constructor(
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.settingsService.getSettings().subscribe(
      (settingsModel: SettingsModel) => {
        this.allowRegistration = settingsModel.allowRegistration;
      }
    )
  }
  save(){
    let settings = {allowRegistration: this.allowRegistration};
    this.settingsService.modifySettings(settings);
    this.router.navigate(['/']);
  }
}
