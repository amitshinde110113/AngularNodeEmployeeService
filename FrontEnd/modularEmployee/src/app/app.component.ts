import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpService } from './shared/http.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private fb:FormBuilder,private httpService:HttpService,private toaster:ToastrService,private modalService: BsModalService){}
  title = 'modularEmployee';
  hide; modalRef: BsModalRef;

  user1:FormGroup
  skills=[]
  hobbies=['false','false','false','false']
  ngOnInit() {

      this.user1=this.fb.group({

        lastName1:['',Validators.required],
        firstName1: ['',Validators.required],
        email1: ['',[Validators.required, Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]],
       
        gender1: ['Male'],
      });
  }

onSave(){
  console.log(this.user1.value);
  let data= new FormData();
  data.append('firstName',this.user1.get('firstName1').value);
  data.append( 'lastName', this.user1.get('lastName1').value);
  data.append('email',this.user1.get('email1').value);
  //data.append('contactNumber','');

  //data.append( 'age', '')
 // data.append( 'salary','' );
   data.append( 'gender', this.user1.get('gender1').value);
  // data.append( 'education','' );
  // data.append( 'city','' );
  // data.append( 'state', '');
  // data.append( 'pin', '');
  // data.append( 'address','' );
  // data.append( 'skills[]', JSON.stringify(this.skills));
  // for (var i = 0; i < this.hobbies.length; i++) {
  //   data.append('hobbies[]', this.hobbies[i]);
 
  //   }


  this.httpService.create(data).subscribe(response=>{
    if(response)
    {
      this.toaster.success('Added Succeccfully...!');
      this.hide=true;

      this.modalRef.hide();
     
    }
  });
}



openModal(exampleModalCenter: TemplateRef<any>) {
  this.modalRef = this.modalService.show(exampleModalCenter);
 // this.modalRef = this.modalService.hide(exampleModalCenter);

}

}
