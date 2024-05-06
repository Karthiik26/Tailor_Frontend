import { Component } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { TailorService } from '../service/Tailor/tailor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {

  constructor(private Service: AppointmentService, private tailorservice: TailorService) { }
  userid: any;
  Inputitem: any;
  Appointmentsubmit(Formvalues: any) {
    console.log(Formvalues);
    this.Service.AppointmentSubmit(this.userid, Formvalues).subscribe((res) => {
      console.log(res);
      Swal.fire({
        title: 'Your Appointment Booked SuccessFully',
        icon: "success",
        iconHtml: '',
        showCancelButton: false,
        showCloseButton: false
      });
      this.ShowHideCheck = true;
      this.ShowHideBook = false;
    })
  }
  SelectTailor: any[] = [];
  FetchingTailors() {
    this.tailorservice.FetchingTailors().subscribe({
      next: (value: any) => {
        this.SelectTailor = value
      }, error: (err) => {

      },
    })
  }

  ChangeTheBtn1() {
    this.ShowHideBook = false;
    this.ShowHideCheck = true;
  }

  showNotification: boolean = false;
  notificationMessage: string = '';
  ShowHideCheck: boolean = true;
  ShowHideBook: boolean = false;
  showPopup: boolean = false;

  ClosePopUp() {
    this.showPopup = false;
  }

  CheckAvailability(TailorId: any, Date: any, Time: any) {
    console.log(TailorId, Date, Time);
    this.Service.CheckAvailability(TailorId, Time, Date).subscribe({
      next: (value: any) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-left',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          customClass: {
            popup: 'colored-toast-main',
          }
        });
        console.log(value);
        if (value.Dateavailable && value.Timeavailable) {
          // Both date and time are available
          console.log('Date and time are available');
          this.showPopup = true;
          this.showNotification = true;
          this.ShowHideBook = true;
          this.ShowHideCheck = false;
          this.notificationMessage = 'Date and time are available';
          Toast.fire({
            icon: 'success',
            title: 'Date and time are available'
          });
          setTimeout(() => {
            this.showPopup = false;
          }, 2000);
        } else if (value.Dateavailable) {
          this.showPopup = true;
          // Only date is available
          console.log('Date is available but time is not');
          this.showNotification = true;
          this.notificationMessage = 'Date is available but time is not';

          Toast.fire({
            icon: 'warning',
            title: 'Date Is Available But Time Is Not'
          });
          setTimeout(() => {
            this.showPopup = false;
          }, 2000);
        } else if (!value.Timeavailable) {
          this.showPopup = true;
          // Tailor is not available
          this.showNotification = true;
          this.notificationMessage = 'Tailor Time is not available';

          Toast.fire({
            icon: 'warning',
            title: 'Tailor Time Is Not Available'
          });
          setTimeout(() => {
            this.showPopup = false;
          }, 2000);
        }
        else {
          this.showPopup = true;
          // Date is not available
          console.log('Date is not available');
          this.showNotification = true;
          this.notificationMessage = 'Date is not available';

          Toast.fire({
            icon: 'warning',
            title: 'Date is not available'
          });
          setTimeout(() => {
            this.showPopup = false;
          }, 2000);
        }
      }, error: (err) => {
        console.log(err);
      },
    })
    console.log(TailorId);
    console.log(Date);
    console.log(Time);
  }
  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn')) {
      let user = localStorage.getItem('isLoggedIn');
      let data = user && JSON.parse(user)._id;
      console.log("users data" + data);
      this.userid = data;
      if (data) {
        this.Service.FetchingData(data).subscribe({
          next: (res) => {
            console.log(" single item ", res);
            this.Inputitem = res;
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    }
    this.FetchingTailors();
  }
}
