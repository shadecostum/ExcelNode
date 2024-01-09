import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

 
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api'; // Base URL for your API
 
  constructor(private http: HttpClient) {}
 
  getUser(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`).pipe(
      map((users: any[]) => users.find((user: { UserName: string; }) => user.UserName === username))
    );
  }
 
  login(credentials: { UserName: string; Password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
 
  addition(username: string, value: number): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/addition/${username}`, { value });
  }
}
interface User {
  UserName: string;
  Password: string;
  Result?: number;
}