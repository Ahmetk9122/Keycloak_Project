import { Component } from '@angular/core';
import { FlexiGridModule } from 'flexi-grid';
import { FlexiToastService } from 'flexi-toast';
import { HttpService } from '../../services/http.service';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { FlexiButtonComponent } from 'flexi-button';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FlexiGridModule, FlexiButtonComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  //  #region [ Fields ]
  users: User[] = [];
  // #endregion

  //  #region [ Initialize ]
  constructor(
    private http: HttpService,
    private toast: FlexiToastService,
    private userService: UserService
  ) {
    this.getUsers();
  }
  // #endregion

  //  #region [ Entity ]
  getUsersAPI() {
    this.userService.getUsers().subscribe(
      (response) => {
        response.isSuccessful;
        if (response.isSuccessful) {
          this.users = response.data ?? [];
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
  deleteUserByIdFromAPI(id: Guid) {
    this.userService.deleteUserById(id).subscribe(
      (response) => {
        response.isSuccessful;
        if (response.isSuccessful) {
          this.getUsers();
          this.toast.showToast('Info', 'Kullanıcı başarıyla silindi', 'info');
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
  getUsers() {
    this.getUsersAPI();
  }
  // #endregion

  //  #region [ Validations ]
  // #endregion

  //  #region [ Internal ]
  // #endregion

  deleteById(id: Guid) {
    debugger;
    this.toast.showSwal('Delete User?', 'You want to delete this user?', () => {
      this.deleteUserByIdFromAPI(id);
      // this.http.delete<string>(`Users/DeleteById?id=${id}`, (res) => {
      //   this.toast.showToast('Info', res, 'info');
      //   // this.getAll();
      // });
    });
  }
}
