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
    return this.http.post<any>('http://localhost:4500/TailorSignUp', formData);
  }

  Login(tailorName: string, tailorPassword: string, tailorEmail: string): Observable<any> {
    const body = {
      TailorName: tailorName,
      TailorPassword: tailorPassword,
      TailorEmail: tailorEmail
    };
    return this.http.post<any>('http://localhost:4500/TailorLogin', body);
  }

  FetchingTailors() {
    return this.http.get('http://localhost:4500/GettingTaiors');
  }

  DeleteTailor(data:any){
    return this.http.delete(`http://localhost:4500/Delete/Tailor/${data}`);
  }

  FetchingTailorsById(){
    let data = localStorage.getItem('TailorLoggin');
    let TailorId = data && JSON.parse(data)._id;
    return this.http.get(`http://localhost:4500/GettingTailorId/${TailorId}`);
  }

  GettingTailorById(TailorId:any){
    return this.http.get(`http://localhost:4500/GettingTailorId/${TailorId}`);
  }

  GettingAppointmentsLength() : Observable<any> {
    return this.http.get('http://localhost:4500/ConfirmedGettingAppointment');
  }

  // Change password tailors

  Chnagepass(id:any, old:any , newpass:any){
    return this.http.post(`http://localhost:4500/changeTailorpassword/${id}`, {old , newpass})
  }

  // Update tailor
  UpdateTailor(id:any, data:any){
    return this.http.put(`http://localhost:4500/tailorUpdate/${id}`, data)
  }
}
