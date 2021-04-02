import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  private id: string ='';
  public employee: Employee;
  private url: string;
  private baseUrl: string;
  private http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute, private router: Router) {
    this.baseUrl = baseUrl;
    this.http = http;    
  }
  
 
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params["Id"];
      this.http.get<Employee>(this.baseUrl + 'Employees/GetEmployee/' + this.id).subscribe(result => {
        this.employee = result;
      }, error => console.error(error));
    })
  
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


