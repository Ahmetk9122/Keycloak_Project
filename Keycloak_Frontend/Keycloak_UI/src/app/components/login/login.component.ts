import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/Login';
import { flatMap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  //  #region [ Fields ]
  loginModel: Login = new Login();
  // #endregion

  //  #region [ Initialize ]
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: FlexiToastService
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // #endregion
  //  #region [ Entity ]
  loginFromAPI(login: Login) {
    this.authService.login(login).subscribe(
      (response) => {
        response.isSuccessful;
        if (response.isSuccessful) {
          localStorage.setItem('access-token', response.data!.access_token);
          this.router.navigateByUrl('/');
          this.toast.showToast('Success', 'Login is successful.');
          return;
        } else if (response.isSuccessful == false) {
          this.toast.showToast('Error', 'Something went wrong', 'error');
        }
      },
      (err) => {
        this.toast.showToast('Error', 'Something went wrong', 'error');
      }
    );
  }
  // #endregion
  //  #region [ UI Tools ]
  login() {
    this.loginFromAPI(this.loginModel);
  }
  // #endregion
  //  #region [ Validations ]
  // #endregion
  //  #region [ Internal ]
  // #endregion
}
