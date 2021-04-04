import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  public employees: Employee[];
  baseURL: string;
  http: HttpClient;
  popup: boolean;
  id: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseURL = baseUrl;
    this.http = http;
  }

  ngOnInit() {
    this.http.get<Employee[]>(this.baseURL + 'Employees/GetAll/').subscribe(result => {
      
      this.employees = result;
    }, error => console.error(error));

  }

  showPopUp(id: string) {
    this.popup = true;
    this.id = id;
  }

 hidePopUp() {
    this.popup = false;
    this.id = '';
  }

  deleteEmployee() {
    
    this.http.delete<number>(this.baseURL + 'Employees/DeleteEmployee/' +this.id).subscribe(result => {
        console.log('Deleted')
      }, error => console.error(error));
    this.hidePopUp();
    window.location.reload();
  }
}

interface Employee {
  employeeId: number;
  name: string;
  jobRole: string;
  photo: string;
}

