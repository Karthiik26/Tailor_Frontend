import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

  // Indian Postal Pin Code
  getData(pincode: any): Observable<any> {
    const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;
    return this.http.get<any[]>(apiUrl);
  }


  logOut(){
    localStorage.removeItem('isLoggedIn');
  }

  async successAlert() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        popup: 'colored-toast',
      }
    });

    await Toast.fire({
      icon: 'success',
      title: 'Success'
    });
  }

  async ErrorAlert() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        popup: 'colored-toast',
      }
    });

    await Toast.fire({
      icon: 'error',
      title: 'error'
    });
  }

}
