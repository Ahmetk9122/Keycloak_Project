import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/LoginResponse';
import { Login } from '../models/Login';
import { Result } from '../models/Result';
import { Register } from '../models/Register';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(public inject: Injector) {
    super(inject);
  }

  login(login: Login): Observable<Result<LoginResponse>> {
    return this.postBase('auth/login', login, false);
  }

  register(register: Register): Observable<Result<LoginResponse>> {
    return this.postBase('auth/register', register, false);
  }
}
