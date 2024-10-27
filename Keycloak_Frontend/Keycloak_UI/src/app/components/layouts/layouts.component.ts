import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

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
  constructor(private router: Router) {}
  // #endregion
  //  #region [ Entity ]
  // #endregion
  //  #region [ UI Tools ]
  logOut() {
    localStorage.removeItem('access-token');
    this.router.navigateByUrl('/login');
  }
  // #endregion
  //  #region [ Validations ]
  // #endregion
  //  #region [ Internal ]
  // #endregion
}
