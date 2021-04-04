import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AddUpdateEmployeeComponent } from './employee-form/add-update-employee/add-update-employee.component';
import { ViewEmployeeComponent } from './employee-form/view-employee/view-employee.component';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,   
    AddUpdateEmployeeComponent,
    ViewEmployeeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ViewEmployeeComponent, pathMatch: 'full' },
      { path: 'view', component: ViewEmployeeComponent, pathMatch: 'full' },
      { path: 'emp', component: AddUpdateEmployeeComponent, pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
