import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { Result } from '../models/Result';
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends BaseService {
  constructor(public inject: Injector) {
    super(inject);
  }

  getAllRoles(): Observable<Result<Role[]>> {
    return this.getBase('Roles/GetAllRoles', true);
  }
  deleteRoleByName(name: string): Observable<Result<string>> {
    return this.deleteBase('Roles/DeleteRoleByName/' + name);
  }
}
