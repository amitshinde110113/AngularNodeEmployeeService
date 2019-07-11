import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl= 'http://localhost:3000/';
  httpOptions = {
  headers: new HttpHeaders({
     'Content-Type': 'application/json'
    // 'Content-Type': 'application/form-data',
    // Accept: 'multipart/form-data'
  })
  
}
  constructor(private http:HttpClient) { }

  updateEement;searchString;
  loadData(){


    const url = this.baseUrl+'employees';
    
      return this.http.get(url);
       
      
  }
  delete(id){
    const url = this.baseUrl+'employees/delete/'
   return this.http.delete<any>(url +id);
  
  
  
  }


  getValuesForUpdate(id)
{const url = this.baseUrl+'employees/';
 return this.http.get(url+id);
}


update(data,id){

const url = this.baseUrl+'employees/update/';
 


  //const jsondata = JSON.stringify(data);


  return  this.http.patch<any>(url + id, data)
}



create(data){

 
      
  let url = this.baseUrl+'employees/create';
  
  
  return this.http.post<any>(url,data)

}
}
