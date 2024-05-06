import { Component } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-users-save-appointments',
  templateUrl: './users-save-appointments.component.html',
  styleUrls: ['./users-save-appointments.component.css']
})
export class UsersSaveAppointmentsComponent {

  constructor(private service: AppointmentService) { }

  HideShow1:boolean=false;
  HideShow2:boolean=true;
  // Getting Appoinment Data
  AppointmentData: any;
  ngOnInit(): void {
    this.ListingAppointments();
  }
  
  TailorId: any;
  ListingAppointments() {
    if (localStorage.getItem('isLoggedIn')) {
      let data = localStorage.getItem('isLoggedIn');
      let userid = data && JSON.parse(data)._id;
      console.log(userid + " In saved appointment");
      if (userid) {
        this.service.FetchingData(userid).subscribe({
          next: (res: any) => {
            console.log("Response Appointment",res);
            console.log("Response Appointment",res.Appointment.length);
            this.AppointmentData = res.Appointment;
            console.log("Listing", res.Appointment)
            if (res.Appointment.length>=1) {
              this.HideShow1=true;
              this.HideShow2=false;
            }else{
              this.HideShow1=false;
              this.HideShow2=true;

            }


          },
          error: (err) => {
            console.log(err);

          }
        });
      }
    }

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

      this.service.CancelAppointment(appointmentId.UsersId, appointmentId.SelectedTailor, appointmentId.AppointmentId).subscribe({
        next: (res) => {
          console.log("Your Items Is Deleted" + res);
          this.ListingAppointments();
        },
        error: (err) => {
          console.log(err);

        }
      })

    }

  }



}
