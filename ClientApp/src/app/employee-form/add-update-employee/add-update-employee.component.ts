import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-add-update-employee',
    templateUrl: './add-update-employee.component.html',
    styleUrls: ['./add-update-employee.component.css']
})
/** add-update-employee component*/
export class AddUpdateEmployeeComponent {

  http: HttpClient;
  baseUrl: string;
  id: string;
  employee: Employee;
  isAdd: boolean;
  
  addUpdateForm = this.formBuilder.group({
    name: '',
    jobRole: '',
    motto: '',
    hobbies: '',
    hometown: '',
    personalBlog: ''
  });

    /** add-update-employee ctor */
  constructor(private formBuilder: FormBuilder, http: HttpClient, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute, private router: Router) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params["Id"];
      if (this.id != 'undefined') {
        this.http.get<Employee>(this.baseUrl + 'Employees/GetEmployee/' + this.id).subscribe(result => {
          this.updateFormValues(result)
        }, error => console.error(error));
        this.isAdd = true;
      }
      else {
        this.isAdd = false;
      }
      
    })

  }

  updateFormValues(employee) {
    this.addUpdateForm = this.formBuilder.group({
      name: employee["name"],
      jobRole: employee["jobRole"],
      motto: employee["motto"],
      hobbies: employee["hobbies"],
      hometown: employee["hometown"],
      personalBlog: employee["personalBlog"]
    });
  }

  onSubmit() {
    console.warn('Your order has been submitted', this.addUpdateForm.value);
    if (this.isAdd) {
      const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post<Employee>(this.baseUrl + 'Employees/AddEmployee/', this.addUpdateForm.value, { headers: headerOptions }).subscribe(result => {
        console.log(result)
      }, error => console.error(error));
    }
    else {

      this.addUpdateForm.value['employeeId'] = this.id;
      const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post<Employee>(this.baseUrl + 'Employees/UpdateEmployee/', this.addUpdateForm.value, { headers: headerOptions }).subscribe(result => {
        console.log(result)
      }, error => console.error(error));
    }
    
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

