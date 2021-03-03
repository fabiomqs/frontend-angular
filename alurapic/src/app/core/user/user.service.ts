import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode'
import { TokenService } from '../token/token.service';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class UserService {

    private userSubject = new BehaviorSubject<User>(null);
    private userName: string;

    constructor(private tokenService: TokenService) {
        this.tokenService.hasToken() &&
            this.decodeAndNotify();
     }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    private decodeAndNotify() {
        const token = this.tokenService.getToken();
        const user = jwt_decode(token) as User; //<- (aqui a chamada jwt_decode)
        this.userName = user.name;
        this.userSubject.next(user);
    }

    isLogged() {
        return this.tokenService.hasToken();
    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    getUserName() {
        return this.userName;
    }
}