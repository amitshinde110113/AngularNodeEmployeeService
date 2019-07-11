import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from 'src/app/shared/http.service';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  url:any="/assets/default-avatar-profile-icon-vector-18942381.jpg"
  user: FormGroup; msg: null; hobbies; checkboxvalid = 0; agevalidiator;
  constructor(private fb: FormBuilder, private http: HttpClient, private httpService: HttpService, private router: Router,private toastr: ToastrService) { }
  educations = ['SSC', 'HSC', 'Gradutaion', 'Post Gradution']
  imageselection=false;
  orders = [
    { id: 1, name: 'Singing', value: false },
    { id: 2, name: 'Reading', value: false },
    { id: 3, name: 'Dancing', value: false },
    { id: 4, name: 'Cooking', value: false }
  ];
  tagSuggestions=['C','CPP','JAVA','Angular','Python','NodeJs']
  states = [
    { name: 'Gujarat', cities: ['surat', 'Ahmedabad', 'Anand', 'Dwarka', 'Gandhinagar', 'Jamnagar', 'Rajkot', 'Somnath'] }
    , { name: 'Maharashtra', cities: ['Pune', 'Mumbai', 'Nashik', 'Nagar'] }
  ];
  cities: Array<any>;

  ngOnInit() {

    //  Initilizing the Initial Form

    this.user = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]],
      salary: ['', Validators.required],
     
      gender: ['Male'],
      orders: new FormArray([]),
      pin: ['', [Validators.required,Validators.min(100000)]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      education: ['', Validators.required],
      bdate: ['', Validators.required],
      profiePic:[''],
      address:[''],
      contactNumber: [9730110113,[Validators.required,Validators.minLength(10),Validators.min(1000000000) ]],
      skills:[[],[Validators.required,Validators.minLength(2)]],
   //   [Validators.required,Validators.minLength(2)]
    }); 
   
    this.addCheckboxes();
   
    
    
    
  }


  // To adding CheckBoxes

  private addCheckboxes() {
    this.orders.map((o, i) => {
      const control = new FormControl(i); // if first item set to , else false
      control.setValue(false);
      (this.user.controls.orders as FormArray).push(control);
    });
  }


  onCreate() {

    console.log(this.user.get('bdate').value);

    this.hobbies = this.orders;
    for (let i = 0; i < this.hobbies.length; i++) {
      this.hobbies[i].value = this.user.controls.orders.get(i.toString()).value;
    }


   
    let hobbivalidator = [];
    this.hobbies.forEach((ele, res) => {
      if (ele.value) {
        hobbivalidator[res] = ele.value
      }

    });
    let formData=new FormData();
    formData.append( 'firstName', this.user.get('firstName').value,);
    if(this.imageselection){
      formData.append( 'profiePic', this.user.get('profiePic').value,(this.user.get('profiePic').value).name);
    }
    let skills= this.user.get('skills').value
    formData.append( 'lastName', this.user.get('lastName').value);
    formData.append( 'age', this.user.get('bdate').value);
    formData.append( 'email', this.user.get('email').value);
    formData.append( 'salary', this.user.get('salary').value);
    formData.append( 'gender', this.user.get('gender').value);
    formData.append( 'education', this.user.get('education').value);
    formData.append( 'city', this.user.get('city').value);
    formData.append( 'state', this.user.get('state').value);
    formData.append( 'pin', this.user.get('pin').value);
    formData.append( 'address', this.user.get('address').value);
    formData.append( 'contactNumber', this.user.get('contactNumber').value);

   
      formData.append( 'skills[]', JSON.stringify(skills));
   
  // console.log(skills);
   
 for (var i = 0; i < this.hobbies.length; i++) {
   formData.append('hobbies[]', this.hobbies[i].value);

   }
   
    
    //   console.log(hobbivalidator,hobbivalidator.length)
    //if (hobbivalidator.length > 1) {
    //  this.httpService.create(formData)
    this.http.post<any>('http://localhost:3000/employees/create',formData).subscribe(response => 
    {
      //  console.log(response);
        if (response) { 
          this.ngOnInit();
          this.showSuccess() 
        }
      } );

  //  } else { alert('Please Select atleast 2 hobbies') }
  }



  onPrevious() {

    this.router.navigate(['/list']);

  }




  onChangeState(name) {
    this.cities = this.states.find(resp => resp.name == name).cities;

  }

  

  hobbiesError: Boolean = false;
  count = 0;

  onCheckBoxCheck(i) {
    this.hobbiesError = true;
    
    //console.log(this.user.controls.orders.get('0').value)
 

  if (this.user.controls.orders.get(i.toString()).value) {
          this.count++;
       //   console.log(this.count);
         
          
  }else{this.count--;
   // console.log(this.count);
  }

  if(this.count>1) {
    this.hobbiesError=false;
  }
  }

  onFleLoad(event){
    if(event.target.files.length>0)
    { this.imageselection=true;
      const img=event.target.files[0];
      
      this.user.patchValue({profiePic:img})
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); // read file as data url
  
        reader.onload = (event) => { 
          // called once readAsDataURL is completed
         
          this.url = reader.result;
        }
      }
    }
   // console.log(this.user.get('profiePic').value)
  }

  showSuccess() {
    this.toastr.success('Created Successfully!');
  }

}
