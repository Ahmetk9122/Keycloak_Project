import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
})
export class LayoutsComponent {
  //  #region [ Fields ]
  // #endregion
  //  #region [ Initialize ]
  /**
   *
   */
  constructor(private keycloakService: KeycloakService) {}
  // #endregion
  //  #region [ Entity ]
  // #endregion
  //  #region [ UI Tools ]
  logOut() {
    localStorage.removeItem('access-token');
    this.keycloakService.logout();
  }
  // #endregion
  //  #region [ Validations ]
  // #endregion
  //  #region [ Internal ]
  // #endregion
}
