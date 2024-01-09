import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
 
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
 
  constructor(private userService: UserService, private router: Router) {}
 
  login() {
    this.userService.login({ UserName: this.username, Password: this.password }).subscribe(
      (response) => {
        console.log('Login successful:', response);
        // Navigate to the addition page
        this.router.navigate(['/addition', this.username]);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
 