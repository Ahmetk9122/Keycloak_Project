import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { Result } from '../models/Result';
import { User } from '../models/User';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(public inject: Injector) {
    super(inject);
  }

  getUsers(): Observable<Result<User[]>> {
    return this.getBase('Users/GetAllUsers', true);
  }
  deleteUserById(id: Guid): Observable<Result<string>> {
    return this.deleteBase('Users/DeleteUserById/' + id);
  }
}
