import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../models/Result';
import { LoginResponse } from '../models/LoginResponse';
import { FlexiToastService } from 'flexi-toast';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  protected readonly baseUrl: string;
  private token: string;
  constructor(private http: HttpClient, private toast: FlexiToastService) {
    this.baseUrl = 'https://localhost:7067/api';
    this.token = localStorage.getItem('access-token') ?? '';
  }

  get<T>(endpoint: string, callback: (res: T) => void) {
    this.http
      .get<Result<T>>(`${this.baseUrl}/${endpoint}`, {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      })
      .subscribe({
        next: (res) => {
          callback(res.data!);
        },
        error: (err: HttpErrorResponse) => {
          this.errorHandler(err);
        },
      });
  }
  post<T>(endpoint: string, body: any, callback: (res: T) => void) {
    this.http
      .post<Result<T>>(`${this.baseUrl}/${endpoint}`, body, {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      })
      .subscribe({
        next: (res) => {
          callback(res.data!);
        },
        error: (err: HttpErrorResponse) => {
          this.errorHandler(err);
        },
      });
  }

  put<T>(endpoint: string, body: any, callback: (res: T) => void) {
    this.http
      .put<Result<T>>(`${this.baseUrl}/${endpoint}`, body, {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      })
      .subscribe({
        next: (res) => {
          callback(res.data!);
        },
        error: (err: HttpErrorResponse) => {
          this.errorHandler(err);
        },
      });
  }

  delete<T>(endpoint: string, callback: (res: T) => void) {
    this.http
      .delete<Result<T>>(`${this.baseUrl}/${endpoint}`, {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      })
      .subscribe({
        next: (res) => {
          callback(res.data!);
        },
        error: (err: HttpErrorResponse) => {
          this.errorHandler(err);
        },
      });
  }

  errorHandler(err: HttpErrorResponse) {
    if (err.status === 401 || err.status === 403) {
      this.toast.showToast('Error', 'You are not authorized', 'error');
    } else {
      if (err.error.errorMessages) {
        const e = err.error.errorMessages;
        e.forEach((el: string) => {
          if (el === null) {
            this.toast.showToast('Error', 'Something went wrong', 'error');
          } else {
            this.toast.showToast('Error', el, 'error');
          }
        });
      } else {
        this.toast.showToast('Error', 'Something went wrong', 'error');
      }
    }
  }
}
