import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
/** view-employee component*/
export class ViewEmployeeComponent implements OnInit {

  private id: string = '';
  public employee: Employee;
  private url: string;
  private baseUrl: string;
  private http: HttpClient;
  private route: ActivatedRoute;
  private router: Router;
  private popup: boolean;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, route: ActivatedRoute, router: Router) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.route = route;
    this.router = router;
 
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params["Id"];
      if (this.id != undefined) {
        this.http.get<Employee>(this.baseUrl + 'Employees/GetEmployee/' + this.id).subscribe(result => {
          this.employee = result;
        }, error => console.error(error));
      }
    })
 
  }


  deleteEmployee() {
    this.route.queryParams.subscribe(params => {
      this.id = params["Id"];
      this.http.delete<number>(this.baseUrl + 'Employees/DeleteEmployee/' + this.id).subscribe(result => {
        console.log('Deleted')
      }, error => console.error(error));
    })
    this.popup = false;
    window.location.reload();
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


