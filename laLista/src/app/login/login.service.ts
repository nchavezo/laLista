import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://api-lista-nico.onrender.com/usuarios';
  private loggedInUser = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }


  setLoggedInUser(userData: any) {
    this.loggedInUser.next(userData);
  }

  getLoggedInUser(): Observable<any> {
    return this.loggedInUser.asObservable();
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUserById(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get(url);
  }

  updateUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put(url, user);
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete(url);
  }
}
