import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
 
@Component({
  selector: 'app-addition',
  templateUrl: './addition.component.html',
  styleUrls: ['./addition.component.css'],
})
export class AdditionComponent implements OnInit {
  username: string = '';
  result: number = 0;
  previousResult: number | undefined;
  value1: number = 0;
  value2: number = 0;
 
  constructor(private route: ActivatedRoute, private userService: UserService) {}
 
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      this.getUserData();
    });
  }
 
  getUserData() {
    this.userService.getUser(this.username).subscribe(
      {
     next: (user) => {
        if (user) {
          this.previousResult = user.result ;
        } else {
          console.error('User not found');
        }
      },
     error: (error) => {
        console.error('Error fetching user data:', error);
      }
    }
    );
  }
 
  performAddition() {
    const parsedValue1 = parseFloat(this.value1.toString());
    const parsedValue2 = parseFloat(this.value2.toString());
 
    if (!isNaN(parsedValue1) && !isNaN(parsedValue2)) {
      const currentResult = parsedValue1 + parsedValue2;
      this.userService.addition(this.username, currentResult).subscribe(
        (user) => {
          console.log('Result sent to the server:', user);
          this.result = currentResult;
        },
        (error) => {
          console.error('Error sending result to the server:', error);
        }
      );
    } else {
      console.error('Invalid input values');
    }
  }
}