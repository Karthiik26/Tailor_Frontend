import { Component } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-tailor-confirmed-appointment',
  templateUrl: './tailor-confirmed-appointment.component.html',
  styleUrls: ['./tailor-confirmed-appointment.component.css']
})
export class TailorConfirmedAppointmentComponent {

  
  constructor(private appointmentservice : AppointmentService){}

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
        this.GettingAppointments=value.confirmedAppointments;
      },error : (err) => {
        console.log(err);
      },
    })
  }

}
