import { CanActivate, Router } from "@angular/router";
import { SettingsService } from "../services/settings.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class SettingsGuard implements CanActivate {
  constructor(
    private router: Router,
    private settingsService: SettingsService
  ) {}

  canActivate(): Observable<boolean> {
    return this.settingsService.getSettings().pipe(
      map(settings => {
        if (settings.allowRegistration) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
