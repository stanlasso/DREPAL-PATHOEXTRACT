import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Utilisateur } from '../_models/utilisateur.model';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {


    private userTokenSubject: BehaviorSubject<Object>;
    public currentUserToken = '';
    public userToken: Observable<Object>;
    public currentUser!: Utilisateur;
    public currentUserSubject: BehaviorSubject<Utilisateur>;
    public currentUserObservable: Observable<Utilisateur>;


    constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) {
        this.userTokenSubject = new BehaviorSubject<Object>(JSON.parse(localStorage.getItem('userToken') || '{}'));
        this.userToken = this.userTokenSubject.asObservable();
        this.currentUserSubject = new BehaviorSubject<Utilisateur>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
        this.currentUserObservable = this.currentUserSubject.asObservable();
    }

    public get userTokenValue(): string {
        return this.currentUserToken;
    }
    created(fullname: string, username: string, password: string, profil: string) {
        // console.log(username, password)
        return this.http.post<any>(`${environment.apiUrl}/user/add`, { fullname, username, password, profil })
            .pipe(map(result => {
                // login successful if there's a jwt token in the response
                /* if (result && result.token) {
                     // store user details and jwt token in local storage to keep user logged in between page refreshes
                     localStorage.setItem('userToken', JSON.stringify(result.token));
                     this.userTokenSubject.next(result.token);
                     this.currentUserToken = result.token;
                 }
                 this.getCurrentUser(username).subscribe((username) => {
                     this.currentUser = username;
                     localStorage.setItem('currentUser', JSON.stringify(username));
                     this.currentUserSubject.next(username);
                 });
 
                 return result.token;*/
                return result
            }));

    }

    login(username: string, password: string) {
        // console.log(username, password)
        return this.http.post<any>(`${environment.apiUrl}/user/login`, { username, password })
            .pipe(map(result => {
                // login successful if there's a jwt token in the response
                if (result && result.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('userToken', JSON.stringify(result.token));
                    this.userTokenSubject.next(result.token);
                    this.currentUserToken = result.token;
                }
                this.getCurrentUser(username).subscribe((username) => {
                    this.currentUser = username;
                    localStorage.setItem('currentUser', JSON.stringify(username));
                    this.currentUserSubject.next(username);
                });

                return result.token;
            }));

    }
    forgot(username: string) {
        // console.log(username, password)
        return this.http.post<any>(`${environment.apiUrl}/user/forgot`, { username })
            .pipe(map(result => {
                console.log(result)
            }));

    }

    getAuthenticatedUser(): Utilisateur {
        return JSON.parse(localStorage.getItem("currentUser") || '{}') as Utilisateur;
    }

    getCurrentUser(username: any) {
        return this.http.get<Utilisateur>(`${environment.apiUrl}/user/find/${username}`)
            .pipe(
                map((user: Utilisateur) => {
                    this.currentUser = user as Utilisateur;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    console.log(user);
                    return user;
                })
            )
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userToken');
        this.userTokenSubject.next(null as any);
        this.currentUserSubject.next(null as any);
    }
    reload(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/user/reload`);
    }
    clean(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/user/clean`);
    }

}
