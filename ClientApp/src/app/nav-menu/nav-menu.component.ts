import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  public employees: Employee[];


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Employee[]>(baseUrl + 'Employees/GetAll/').subscribe(result => {
      this.employees = result;
    }, error => console.error(error));
  }


}

interface Employee {
  employeeId: number;
  name: string;
  jobRole: string;
  photo: string;
}

