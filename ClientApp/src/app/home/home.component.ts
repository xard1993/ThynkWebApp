import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  public employee: Employee;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Employee>(baseUrl + 'Employees/GetEmployee/1').subscribe(result => {
      this.employee = result;
    }, error => console.error(error));
  }
}

interface Employee {
  employeeId: number;
  name: string;
  jobRole: string;
  photo: string;
  motto: string;
  hobbies: string;
  hometown: string;
  personalBlog: string;
}

