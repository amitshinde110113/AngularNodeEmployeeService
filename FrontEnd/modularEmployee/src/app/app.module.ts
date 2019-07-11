import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { TagInputModule } from 'ngx-chips';
import { NgxInputTagModule } from '@ngx-lite/input-tag';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpService } from './shared/http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal'
@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule,
    NgbModule,
    ToastrModule.forRoot(),
    NgxInputTagModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [ToastrService,HttpClient,BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
