import { Component, OnInit } from '@angular/core';
import { Register } from '../../models/Register';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  //  #region [ Fields ]
  registerModel: Register = new Register();
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
  registerFromAPI(register: Register) {
    this.authService.register(register).subscribe(
      (response) => {
        response.isSuccessful;
        if (response.isSuccessful) {
          this.router.navigateByUrl('/login');
          this.toast.showToast('Success', 'Register is successful.');
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
  register() {
    this.registerFromAPI(this.registerModel);
  }
  // #endregion
  //  #region [ Validations ]
  // #endregion
  //  #region [ Internal ]
  // #endregion
}
