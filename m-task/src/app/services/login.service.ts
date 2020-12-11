import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/users';


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    protected basePath = 'https://randomuser.me/api/';
    constructor(private httpClient: HttpClient) { }
    
    headers = new HttpHeaders({
        "Content-Type": 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
       
    });

    login(user: any): Observable<any> {
        return this.httpClient.get(this.basePath, { 
            headers: this.headers 
        });
    }

    loginWithGoogle(userData: any): Observable<any> {
        return this.httpClient.get(this.basePath, { 
                headers: this.headers
            });
    }

}
