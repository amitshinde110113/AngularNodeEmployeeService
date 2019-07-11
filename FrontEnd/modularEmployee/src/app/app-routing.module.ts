import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';

const routes: Routes = [
  {path:'',redirectTo:'/dashbord',pathMatch:'full'},
  {path:'dashbord',component:DashbordComponent},
  {path:'employee', loadChildren:'./employee/employee.module#EmployeeModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
