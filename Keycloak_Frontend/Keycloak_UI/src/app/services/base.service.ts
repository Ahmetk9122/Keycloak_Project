import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injector } from '@angular/core';

export class BaseService {
  protected readonly baseUrl: string;
  protected http: HttpClient;
  protected router: Router;

  constructor(protected injector: Injector) {
    this.http = injector.get(HttpClient);
    this.router = injector.get(Router);
    // var appConfigService = injector.get(AppConfigService);
    // this.baseUrl = appConfigService.apiEndPoint;
    this.baseUrl = 'https://localhost:7067/api/';
    // if (!environment.production) {
    //   this.baseUrl = this.baseUrl + "/api";
    // }
  }

  protected getBase<TEntity>(
    uriPath: string,
    isAuthroized: boolean = true,
    customHeaders?: HttpHeaders
  ): Observable<any> {
    var newUrl = this.baseUrl + uriPath;
    var httpOptions: any;

    var headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');

    if (isAuthroized) {
      headers = headers.append('Authorization', 'Bearer ' + this.token);
    }
    if (customHeaders) {
      var customHeaderKeys = customHeaders.keys();
      for (var i = 0; i < customHeaderKeys.length; i++) {
        var key = customHeaderKeys[i];
        var value = customHeaders.get(key);
        if (value) headers = headers.append(key, value);
      }
    }

    httpOptions = {
      headers: headers,
    };

    return this.http.get<TEntity>(newUrl, httpOptions);
  }
  protected postBase<TEntity>(
    uriPath: string,
    parameters: any,
    isAuthroized: boolean = true,
    customHeaders?: HttpHeaders
  ): Observable<any> {
    var newUrl = this.baseUrl + uriPath;
    var httpOptions: any;
    var headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    // headers = headers.set("Content-type", "application/x-www-form-urlencoded");
    headers = headers.append('Access-Control-Allow-Origin', '*');

    if (isAuthroized) {
      headers = headers.append('Authorization', 'Bearer ' + this.token);
    }
    if (customHeaders) {
      var customHeaderKeys = customHeaders.keys();
      for (var i = 0; i < customHeaderKeys.length; i++) {
        var key = customHeaderKeys[i];
        var value = customHeaders.get(key);
        if (value) headers = headers.append(key, value);
      }
    }

    httpOptions = {
      headers: headers,
    };

    return this.http.post<TEntity>(newUrl, parameters, httpOptions);
  }

  protected postBaseForFileUpload(
    uriPath: string,
    parameters: any,
    isAuthroized: boolean = true
  ): Observable<any> {
    var newUrl = this.baseUrl + uriPath;
    var httpOptions: any;
    var headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');

    if (isAuthroized) {
      headers = headers.append('Authorization', 'Bearer ' + this.token);
    }

    httpOptions = {
      headers: headers,
      reportProgress: true,
      observe: 'events',
    };

    return this.http.post(newUrl, parameters, httpOptions);
  }
  protected getBaseForFileDownload(
    uriPath: string,
    isAuthroized: boolean = true,
    useCustomUrl: boolean = false
  ): Observable<any> {
    var newUrl = useCustomUrl ? uriPath : this.baseUrl + uriPath;
    var httpOptions: any;
    var headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');

    if (isAuthroized) {
      headers = headers.append('Authorization', 'Bearer ' + this.token);
    }

    httpOptions = {
      headers: headers,
      observe: 'response',
      responseType: 'blob',
    };

    return this.http.get(newUrl, httpOptions);
  }
  protected postBaseForFileDownload(
    uriPath: string,
    parameters: any,
    isAuthroized: boolean = true
  ): Observable<any> {
    var newUrl = this.baseUrl + uriPath;
    var httpOptions: any;
    var headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');

    if (isAuthroized) {
      headers = headers.append('Authorization', 'Bearer ' + this.token);
    }

    httpOptions = {
      headers: headers,
      observe: 'response',
      responseType: 'blob',
    };

    return this.http.post(newUrl, parameters, httpOptions);
  }
  protected getBaseForPath(uriPath: string): string {
    return this.baseUrl + uriPath;
  }

  protected deleteBase<TEntity>(
    uriPath: string,
    parameters?: Params,
    isAuthroized: boolean = true,
    customHeaders?: HttpHeaders
  ): Observable<any> {
    var newUrl = this.baseUrl + uriPath;
    var httpOptions: any;
    var headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');

    if (isAuthroized) {
      headers = headers.append('Authorization', 'Bearer ' + this.token);
    }
    if (customHeaders) {
      var customHeaderKeys = customHeaders.keys();
      for (var i = 0; i < customHeaderKeys.length; i++) {
        var key = customHeaderKeys[i];
        var value = customHeaders.get(key);
        if (value) headers = headers.append(key, value);
      }
    }

    httpOptions = {
      headers: headers,
      body: parameters,
    };

    return this.http.delete<TEntity>(newUrl, httpOptions);
  }
  protected putBase<TEntity>(
    uriPath: string,
    parameters?: Params,
    isAuthroized: boolean = true,
    customHeaders?: HttpHeaders
  ): Observable<any> {
    var newUrl = this.baseUrl + uriPath;
    var httpOptions: any;
    var headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');

    if (isAuthroized) {
      headers = headers.append('Authorization', 'Bearer ' + this.token);
    }
    if (customHeaders) {
      var customHeaderKeys = customHeaders.keys();
      for (var i = 0; i < customHeaderKeys.length; i++) {
        var key = customHeaderKeys[i];
        var value = customHeaders.get(key);
        if (value) headers = headers.append(key, value);
      }
    }

    httpOptions = {
      headers: headers,
    };

    return this.http.put<TEntity>(newUrl, parameters, httpOptions);
  }
  protected patchBase<TEntity>(
    uriPath: string,
    parameters?: any,
    isAuthroized: boolean = true,
    customHeaders?: HttpHeaders
  ): Observable<any> {
    var newUrl = this.baseUrl + uriPath;
    var httpOptions: any;
    var headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');

    if (isAuthroized) {
      headers = headers.append('Authorization', 'Bearer ' + this.token);
    }
    if (customHeaders) {
      var customHeaderKeys = customHeaders.keys();
      for (var i = 0; i < customHeaderKeys.length; i++) {
        var key = customHeaderKeys[i];
        var value = customHeaders.get(key);
        if (value) headers = headers.append(key, value);
      }
    }

    httpOptions = {
      headers: headers,
    };

    return this.http.patch<TEntity>(newUrl, parameters, httpOptions);
  }

  protected get token() {
    const token = localStorage.getItem('access-token');
    return token;
  }
}
