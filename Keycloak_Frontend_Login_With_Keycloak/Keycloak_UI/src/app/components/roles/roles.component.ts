import { Component, ElementRef, ViewChild } from '@angular/core';
import { FlexiButtonComponent } from 'flexi-button';
import { FlexiGridModule } from 'flexi-grid';
import { Role } from '../../models/Role';
import { FlexiToastService } from 'flexi-toast';
import { Guid } from 'guid-typescript';
import { HttpService } from '../../services/http.service';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, FlexiGridModule, FlexiButtonComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent {
  //  #region [ Fields ]
  roles: Role[] = [];
  name: string = '';
  description: string = '';
  @ViewChild('addModalCloseBtn') addModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;

  // #endregion

  //  #region [ Initialize ]
  constructor(
    private http: HttpService,
    private toast: FlexiToastService,
    private roleService: RoleService
  ) {
    this.getAllRoles();
  }
  // #endregion

  //  #region [ Entity ]
  getAllRolesFromAPI() {
    this.roleService.getAllRoles().subscribe(
      (response) => {
        response.isSuccessful;
        if (response.isSuccessful) {
          this.roles = response.data ?? [];
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
  deleteRoleByNameFromAPI(name: string) {
    this.roleService.deleteRoleByName(name).subscribe(
      (response) => {
        response.isSuccessful;
        if (response.isSuccessful) {
          this.getAllRoles();
          this.toast.showToast('Info', 'Role başarıyla silindi', 'info');
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
  getAllRoles() {
    this.getAllRolesFromAPI();
  }
  save() {
    this.http.post<string>(
      'Roles/CreateRole',
      { name: this.name, description: this.description },
      (res) => {
        this.toast.showToast('Info', res, 'info');
        this.name = '';
        this.getAllRoles();

        this.addModalCloseBtn!.nativeElement.click();
      }
    );
  }

  // #endregion

  //  #region [ Validations ]
  // #endregion

  //  #region [ Internal ]
  // #endregion

  deleteById(item: any) {
    debugger;
    this.toast.showSwal('Delete Role?', 'You want to delete this role?', () => {
      this.deleteRoleByNameFromAPI(item.name);
    });
  }
}
