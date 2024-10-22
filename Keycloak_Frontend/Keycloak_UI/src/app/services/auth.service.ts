import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/LoginResponse';
import { Login } from '../models/Login';
import { Result } from '../models/Result';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(public inject: Injector) {
    super(inject);
  }

  login(login: Login): Observable<Result<LoginResponse>> {
    debugger;
    return this.postBase('auth/login', login, false);
  }
}
