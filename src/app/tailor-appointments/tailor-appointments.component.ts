import { Component } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-tailor-appointments',
  templateUrl: './tailor-appointments.component.html',
  styleUrls: ['./tailor-appointments.component.css']
})
export class TailorAppointmentsComponent {

  constructor(private appointmentservice : AppointmentService){

  }
 
  ngOnInit(){
    this.GettingYourAppointments()
  }
  
  GettingAppointments:any;
  GettingYourAppointments(){
    let data = localStorage.getItem('TailorLoggin');
    let tailorid = data && JSON.parse(data)._id;

    this.appointmentservice.GettingTailor(tailorid).subscribe({
      next:(value:any) => {
        console.log(value);

        this.GettingAppointments=value.TailorAppointment;
      },error : (err) => {
        console.log(err);
        
      },
    })
  }
  
  TailorInDetail:any;
  AcceptAppoint(data:any){
    console.log(data);
    this.appointmentservice.GettingTailorAppointment(data.AppointmentId, data.SelectedTailor).subscribe({
      next:(value:any) => {
        console.log(value);
        this.TailorInDetail=value;
      },error : (err) => {
        console.log(err);
      },
    })
  }

  CancelData(data:any){
    console.log(data);
    this.appointmentservice.GettingTailorAppointment(data.AppointmentId, data.SelectedTailor).subscribe({
      next:(value:any) => {
        console.log(value);
        this.TailorInDetail=value;
      },error : (err) => {
        console.log(err);
      },
    })
  }
  
  status:any='Approved';
  UpdateStatus(data:any){
    console.log(data);
    
    this.appointmentservice.UpdateStatus(data.UsersId, data.SelectedTailor, data.AppointmentId, this.status ).subscribe({
      next:(value) => {
        console.log(value);
        this.GettingYourAppointments()
      },error:(err) => {
        console.log(err);
        this.GettingYourAppointments()
      },
    })
  }

  DeleteItem(appointmentId: any) {
    if (localStorage.getItem('isLoggedIn')) {
      let user = localStorage.getItem('isLoggedIn');
      let UserId = user && JSON.parse(user)._id;
      console.log(UserId);
      console.log(appointmentId);
      console.log(appointmentId.UserId);
      console.log(appointmentId.AppointmentId);
      console.log(appointmentId.SelectedTailor);

      this.appointmentservice.CancelAppointment(appointmentId.UsersId, appointmentId.SelectedTailor, appointmentId.AppointmentId).subscribe({
        next: (res) => {
          console.log("Your Items Is Deleted" + res);
          this.GettingYourAppointments();
        },
        error: (err) => {
          console.log(err);

        }
      })

    }

  }

}

