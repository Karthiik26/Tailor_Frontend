import { HttpClient, HttpResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface SignupResponse {
  msg: string;
  successs: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  UserLogin(UserName:string, Password:string){
    const body = { UserName, Password };
    return this.http.post(`https://tailor-backend-hqfi.onrender.com/Login`, body);
  }

  // swingdetails
  UserFetching(){
    return this.http.get('https://tailor-backend-hqfi.onrender.com/GettingUsers')
  }

  AdminLogin(AdminEmail:any, AdminPassword:any){
    const body = { AdminEmail, AdminPassword }
    return this.http.post('https://tailor-backend-hqfi.onrender.com/AdminLogin', body)
  }

  DeleteUser(data:any){
    return this.http.delete(`https://tailor-backend-hqfi.onrender.com/Delete/User/${data}`)
  }

  // UserUpdate(UserId:any, Data:any){
  //   return this.http.put(`https://tailor-backend-hqfi.onrender.com/Updating/User/${UserId}`,Data);
  // }

  // UserUpdate(UserId: string, Data: any): Observable<any> {
  //   const formData: FormData = new FormData();
  //   // formData.append('image', image.files[0]);
  //   formData.append('FirstName', Data.FirstName);
  //   formData.append('LastName', Data.LastName);
  //   formData.append('Phone', Data.Phone);
  //   formData.append('Email', Data.Email);

  //   return this.http.put(`https://tailor-backend-hqfi.onrender.com/Updating/User/${UserId}`, formData);
  // }
  UserUpdate(UserId: string, Data: any): Observable<any> {
    return this.http.put(`https://tailor-backend-hqfi.onrender.com/Updating/User/${UserId}`, Data);
  }


  // Updating password
  UpdatingPassword(UserId: any, postData: any) : Observable<any> {
    return this.http.post(`https://tailor-backend-hqfi.onrender.com/change-password/${UserId}`, postData);
  }
  
}
