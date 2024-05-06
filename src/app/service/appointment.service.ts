import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http : HttpClient) { }

  FetchingData(Data:any){
    return this.http.get(`http://localhost:4500/UserDetails/${Data}`);
  }

  AppointmentSubmit(id:any, AppointmentData:any){
    return this.http.put(`http://localhost:4500/Appointment/${id}`, AppointmentData);
  }

  CancelAppointment(id:any, TailorId:any, AppointmentId:any ){
    let data = localStorage.getItem('AdminLoggin');
    let AdminId = data && JSON.parse(data)._id;
    return this.http.put(`http://localhost:4500/CancelingAppointment/${AdminId}/${id}/${TailorId}/${AppointmentId}`,{});
  }

  CheckAvailability(TailorId:any, Time:any , Date:any){
    let data = {date : Date, time : Time}
    return this.http.post(`http://localhost:4500/Check/Availability/${TailorId}`, data);
  }

  GettingTailor(TailorId:any) : Observable<any> {
    return this.http.get(`http://localhost:4500/Tailor/Getting/${TailorId}`)
  }

  GettingTailorAppointment(AppointmentId:any, TailorId:any ){
    return this.http.get(`http://localhost:4500/TailorGetting/Appointment/${TailorId}/${AppointmentId}`)
  }

  // Update status
  UpdateStatus( UserId:any, TailorId:any, AppointmentId:any, status:any) : Observable<any> {
    return this.http.put(`http://localhost:4500/UpdateAppointmentStatus/${UserId}/${TailorId}/${AppointmentId}/${status}`,{});
  }
}
