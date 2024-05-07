import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TailorService {

  constructor(private http: HttpClient) { }

  SignUp(data: any, Image:any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('TailorName', data.TailorName);
    formData.append('TailorEmail', data.TailorEmail);
    formData.append('TailorPassword', data.TailorPassword);
    formData.append('TailorPhone', data.TailorPhone);
    formData.append('TailorSpecialist', data.TailorSpecialist);
    formData.append('TailorAddress', data.TailorAddress);
    formData.append('FromTime', data.FromTime);
    formData.append('ToTime', data.ToTime);
    formData.append('TailorAbout', data.TailorAbout);
    formData.append('TailorImage', Image);
    return this.http.post<any>('https://tailor-backend-hqfi.onrender.com/TailorSignUp', formData);
  }

  Login(tailorName: string, tailorPassword: string, tailorEmail: string): Observable<any> {
    const body = {
      TailorName: tailorName,
      TailorPassword: tailorPassword,
      TailorEmail: tailorEmail
    };
    return this.http.post<any>('https://tailor-backend-hqfi.onrender.com/TailorLogin', body);
  }

  FetchingTailors() {
    return this.http.get('https://tailor-backend-hqfi.onrender.com/GettingTaiors');
  }

  DeleteTailor(data:any){
    return this.http.delete(`https://tailor-backend-hqfi.onrender.com/Delete/Tailor/${data}`);
  }

  FetchingTailorsById(){
    let data = localStorage.getItem('TailorLoggin');
    let TailorId = data && JSON.parse(data)._id;
    return this.http.get(`https://tailor-backend-hqfi.onrender.com/GettingTailorId/${TailorId}`);
  }

  GettingTailorById(TailorId:any){
    return this.http.get(`https://tailor-backend-hqfi.onrender.com/GettingTailorId/${TailorId}`);
  }

  GettingAppointmentsLength() : Observable<any> {
    return this.http.get('https://tailor-backend-hqfi.onrender.com/ConfirmedGettingAppointment');
  }

  // Change password tailors

  Chnagepass(id:any, old:any , newpass:any){
    return this.http.post(`https://tailor-backend-hqfi.onrender.com/changeTailorpassword/${id}`, {old , newpass})
  }

  // Update tailor
  UpdateTailor(id:any, data:any){
    return this.http.put(`https://tailor-backend-hqfi.onrender.com/tailorUpdate/${id}`, data)
  }
}
